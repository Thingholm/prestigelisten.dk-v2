terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.55.0"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy    = true
      recover_soft_deleted_key_vaults = true
    }
  }
}

data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "rg" {
  name     = "prestigelisten-rg"
  location = "West Europe"
}

resource "azurerm_user_assigned_identity" "kv_reader" {
  name                = "prestigelisten-kv-reader-identity"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
}

resource "azurerm_key_vault" "kv" {
  name = "prestigelisten-kv"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  tenant_id          = data.azurerm_client_config.current.tenant_id
  sku_name           = "standard"
  purge_protection_enabled = false
  soft_delete_retention_days = 7
  enabled_for_disk_encryption = true

    access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get",
      "Create",
      "Delete",
      "List",
      "Recover",
      "Backup",
      "Restore",
    ]

    secret_permissions = [
      "Get",
      "Set",
      "Delete",
      "List",
      "Recover",
      "Backup"
    ]
  }
}

resource "azurerm_key_vault_access_policy" "kv_reader" {
  key_vault_id = azurerm_key_vault.kv.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = azurerm_user_assigned_identity.kv_reader.principal_id

  secret_permissions = [
    "Get"
  ]

  depends_on = [ 
    azurerm_user_assigned_identity.kv_reader,
    azurerm_key_vault.kv
   ]
}

variable "google_sheets_credentials_json" {
  description = "Google Sheets service credentials JSON"
  type        = string
  sensitive   = true
}

variable "jwt_public_jwk" {
  description = "JWT public JWK"
  type        = string
  sensitive   = true
}

variable "connection_strings_default_connection" {
  description = "Default connection string for the database"
  type        = string
  sensitive   = true
}

resource "azurerm_key_vault_secret" "google_sheets_creds" {
  name         = "GoogleSheets--ServiceCredentialsJson"
  value        = var.google_sheets_credentials_json
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "jwt_public_jwk" {
  name         = "Authentication--JwtPublicJwk"
  value        = var.jwt_public_jwk
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "db_connection_string" {
  name         = "ConnectionStrings--DefaultConnection"
  value        = var.connection_strings_default_connection
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_container_registry" "acr" {
  name                = "prestigelistenacr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
}

resource "azurerm_log_analytics_workspace" "law" {
  name                = "prestigelisten-law"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "cae" {
  name                = "prestigelisten-cae"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id
}

resource "azurerm_user_assigned_identity" "acr_pull" {
  name                = "prestigelisten-acr-pull-identity"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
}

resource "azurerm_role_assignment" "acr_pull_role" {
  principal_id         = azurerm_user_assigned_identity.acr_pull.principal_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.acr.id
}

resource "azurerm_container_app" "api_ca" {
  name                         = "prestigelisten-api-ca"
  container_app_environment_id = azurerm_container_app_environment.cae.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  template {
    container {
      name    = "prestigelisten-api"
      image   = "${azurerm_container_registry.acr.login_server}/prestigelisten-api:latest"
      cpu     = 0.25
      memory  = "0.5Gi"

      env {
        name        = "GoogleSheets__ServiceCredentialsJson"
        secret_name = "google-sheets-creds"
      }

      env {
        name        = "Authentication__JwtPublicJwk"
        secret_name = "jwt-public-jwk"
      }

      env {
        name        = "ConnectionStrings__DefaultConnection"
        secret_name = "db-connection-string"
      }
    }

    min_replicas = 1
    max_replicas = 3
  }

  secret {
    name                = "google-sheets-creds"
    key_vault_secret_id = azurerm_key_vault_secret.google_sheets_creds.id
    identity            = azurerm_user_assigned_identity.kv_reader.id
  }

  secret {
    name                = "jwt-public-jwk"
    key_vault_secret_id = azurerm_key_vault_secret.jwt_public_jwk.id
    identity            = azurerm_user_assigned_identity.kv_reader.id
  }

  secret {
    name                = "db-connection-string"
    key_vault_secret_id = azurerm_key_vault_secret.db_connection_string.id
    identity            = azurerm_user_assigned_identity.kv_reader.id
  }

  ingress {
    external_enabled = true
    target_port      = 8080
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  registry {
    server   = azurerm_container_registry.acr.login_server
    identity = azurerm_user_assigned_identity.acr_pull.id
  }

  identity {
    type = "UserAssigned"
    identity_ids = [
      azurerm_user_assigned_identity.acr_pull.id,
      azurerm_user_assigned_identity.kv_reader.id
    ]
  }

  depends_on = [
    azurerm_key_vault_access_policy.kv_reader,
    azurerm_key_vault_secret.db_connection_string,
    azurerm_key_vault_secret.google_sheets_creds,
    azurerm_key_vault_secret.jwt_public_jwk  
  ]
}