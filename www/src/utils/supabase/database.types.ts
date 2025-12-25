export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      __EFMigrationsHistory: {
        Row: {
          migration_id: string
          product_version: string
        }
        Insert: {
          migration_id: string
          product_version: string
        }
        Update: {
          migration_id?: string
          product_version?: string
        }
        Relationships: []
      }
      calendar: {
        Row: {
          end_date: string
          id: number
          race_id: number
          start_date: string
        }
        Insert: {
          end_date: string
          id?: number
          race_id: number
          start_date: string
        }
        Update: {
          end_date?: string
          id?: number
          race_id?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_calendar_races_race_id"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          credit: string | null
          credit_url: string | null
          id: number
          image_url: string | null
        }
        Insert: {
          credit?: string | null
          credit_url?: string | null
          id?: number
          image_url?: string | null
        }
        Update: {
          credit?: string | null
          credit_url?: string | null
          id?: number
          image_url?: string | null
        }
        Relationships: []
      }
      meta_races: {
        Row: {
          color_hex: string | null
          dark_text: boolean
          id: number
          image_id: number | null
          name: string
          nation_id: number | null
        }
        Insert: {
          color_hex?: string | null
          dark_text: boolean
          id?: number
          image_id?: number | null
          name: string
          nation_id?: number | null
        }
        Update: {
          color_hex?: string | null
          dark_text?: boolean
          id?: number
          image_id?: number | null
          name?: string
          nation_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_meta_races_images_image_id"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_meta_races_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_rider_counts_view"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_meta_races_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_top_3_riders"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_meta_races_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_meta_races_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["nation_id"]
          },
        ]
      }
      nation_seasons: {
        Row: {
          id: number
          nation_id: number
          points_all_time: number
          points_for_year: number | null
          rank_all_time: number
          rank_for_year: number | null
          year: number
        }
        Insert: {
          id?: number
          nation_id?: number
          points_all_time: number
          points_for_year?: number | null
          rank_all_time: number
          rank_for_year?: number | null
          year: number
        }
        Update: {
          id?: number
          nation_id?: number
          points_all_time?: number
          points_for_year?: number | null
          rank_all_time?: number
          rank_for_year?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_nation_seasons_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_rider_counts_view"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_nation_seasons_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_top_3_riders"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_nation_seasons_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_nation_seasons_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["nation_id"]
          },
        ]
      }
      nations: {
        Row: {
          active: boolean
          active_points: number
          code: string
          id: number
          name: string
          points: number
        }
        Insert: {
          active: boolean
          active_points: number
          code: string
          id?: number
          name: string
          points: number
        }
        Update: {
          active?: boolean
          active_points?: number
          code?: string
          id?: number
          name?: string
          points?: number
        }
        Relationships: []
      }
      point_system: {
        Row: {
          id: number
          points: number
          race_class_id: number
          result_type: number
        }
        Insert: {
          id?: number
          points: number
          race_class_id: number
          result_type: number
        }
        Update: {
          id?: number
          points?: number
          race_class_id?: number
          result_type?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_point_system_race_classes_race_class_id"
            columns: ["race_class_id"]
            isOneToOne: false
            referencedRelation: "race_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      previous_nationalities: {
        Row: {
          end_year: number | null
          id: number
          nation_id: number
          points: number
          rider_id: number
          start_year: number | null
        }
        Insert: {
          end_year?: number | null
          id?: number
          nation_id: number
          points?: number
          rider_id: number
          start_year?: number | null
        }
        Update: {
          end_year?: number | null
          id?: number
          nation_id?: number
          points?: number
          rider_id?: number
          start_year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_previous_nationalities_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_rider_counts_view"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_previous_nationalities_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_top_3_riders"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_previous_nationalities_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_previous_nationalities_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_previous_nationalities_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["rider_id"]
          },
          {
            foreignKeyName: "fk_previous_nationalities_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
        ]
      }
      race_classes: {
        Row: {
          id: number
          name: string
          sorting_index: number
        }
        Insert: {
          id?: number
          name: string
          sorting_index: number
        }
        Update: {
          id?: number
          name?: string
          sorting_index?: number
        }
        Relationships: []
      }
      race_dates: {
        Row: {
          date: string
          id: number
          race_id: number
          stage: number | null
        }
        Insert: {
          date: string
          id?: number
          race_id: number
          stage?: number | null
        }
        Update: {
          date?: string
          id?: number
          race_id?: number
          stage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_race_dates_races_race_id"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      races: {
        Row: {
          active: boolean
          active_span_string: string | null
          id: number
          meta_race_id: number
          race_class_id: number
        }
        Insert: {
          active: boolean
          active_span_string?: string | null
          id?: number
          meta_race_id: number
          race_class_id: number
        }
        Update: {
          active?: boolean
          active_span_string?: string | null
          id?: number
          meta_race_id?: number
          race_class_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_races_meta_races_meta_race_id"
            columns: ["meta_race_id"]
            isOneToOne: false
            referencedRelation: "meta_races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_races_race_classes_race_class_id"
            columns: ["race_class_id"]
            isOneToOne: false
            referencedRelation: "race_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          id: number
          nation_season_id: number | null
          placement: number | null
          race_date_id: number | null
          race_id: number
          result_type: number
          rider_id: number
          rider_season_id: number | null
          sheet_index: number
          stage: number | null
          year: number
        }
        Insert: {
          id?: number
          nation_season_id?: number | null
          placement?: number | null
          race_date_id?: number | null
          race_id: number
          result_type: number
          rider_id: number
          rider_season_id?: number | null
          sheet_index: number
          stage?: number | null
          year: number
        }
        Update: {
          id?: number
          nation_season_id?: number | null
          placement?: number | null
          race_date_id?: number | null
          race_id?: number
          result_type?: number
          rider_id?: number
          rider_season_id?: number | null
          sheet_index?: number
          stage?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_results_nation_seasons_nation_season_id"
            columns: ["nation_season_id"]
            isOneToOne: false
            referencedRelation: "nation_seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_results_race_dates_race_date_id"
            columns: ["race_date_id"]
            isOneToOne: false
            referencedRelation: "race_dates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_results_races_race_id"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_results_rider_seasons_rider_season_id"
            columns: ["rider_season_id"]
            isOneToOne: false
            referencedRelation: "rider_points_by_age"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_results_rider_seasons_rider_season_id"
            columns: ["rider_season_id"]
            isOneToOne: false
            referencedRelation: "rider_seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_results_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["rider_id"]
          },
          {
            foreignKeyName: "fk_results_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_seasons: {
        Row: {
          id: number
          points_all_time: number
          points_for_year: number | null
          rank_all_time: number
          rank_for_year: number | null
          rider_id: number
          year: number
        }
        Insert: {
          id?: number
          points_all_time: number
          points_for_year?: number | null
          rank_all_time: number
          rank_for_year?: number | null
          rider_id: number
          year: number
        }
        Update: {
          id?: number
          points_all_time?: number
          points_for_year?: number | null
          rank_all_time?: number
          rank_for_year?: number | null
          rider_id?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_rider_seasons_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["rider_id"]
          },
          {
            foreignKeyName: "fk_rider_seasons_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
        ]
      }
      riders: {
        Row: {
          active: boolean
          first_name: string | null
          id: number
          image_id: number | null
          last_name: string
          nation_id: number
          points: number
          team_id: number | null
          year: number | null
        }
        Insert: {
          active: boolean
          first_name?: string | null
          id?: number
          image_id?: number | null
          last_name: string
          nation_id: number
          points: number
          team_id?: number | null
          year?: number | null
        }
        Update: {
          active?: boolean
          first_name?: string | null
          id?: number
          image_id?: number | null
          last_name?: string
          nation_id?: number
          points?: number
          team_id?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_riders_images_image_id"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_riders_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_rider_counts_view"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_riders_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_top_3_riders"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_riders_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_riders_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_riders_teams_team_id"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          id: number
          name: string
          nation_id: number | null
        }
        Insert: {
          id?: number
          name: string
          nation_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          nation_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_teams_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_rider_counts_view"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_teams_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nation_top_3_riders"
            referencedColumns: ["nation_id"]
          },
          {
            foreignKeyName: "fk_teams_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "nations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_teams_nations_nation_id"
            columns: ["nation_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["nation_id"]
          },
        ]
      }
    }
    Views: {
      nation_rider_counts_view: {
        Row: {
          active_riders: number | null
          nation_id: number | null
          total_riders: number | null
        }
        Relationships: []
      }
      nation_top_3_riders: {
        Row: {
          active: boolean | null
          active_top_3: boolean | null
          nation_id: number | null
          overall_top_3: boolean | null
          points: number | null
          rider_id: number | null
        }
        Relationships: []
      }
      rider_decade_rankings: {
        Row: {
          decade_start: number | null
          first_name: string | null
          last_name: string | null
          nation_code: string | null
          nation_id: number | null
          nation_name: string | null
          points: number | null
          rank: number | null
          rider_id: number | null
        }
        Relationships: []
      }
      rider_points_by_age: {
        Row: {
          age: number | null
          id: number | null
          points: number | null
          rider_id: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_rider_seasons_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["rider_id"]
          },
          {
            foreignKeyName: "fk_rider_seasons_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
        ]
      }
      riders_3_year_rolling_rankings: {
        Row: {
          points_last_3_years: number | null
          rank_for_3_year_span: number | null
          rider_id: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_rider_seasons_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "rider_decade_rankings"
            referencedColumns: ["rider_id"]
          },
          {
            foreignKeyName: "fk_rider_seasons_riders_rider_id"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_nation_season_counts_by_year: {
        Args: never
        Returns: {
          row_count: number
          year: number
        }[]
      }
      get_rider_season_counts_by_year: {
        Args: never
        Returns: {
          row_count: number
          year: number
        }[]
      }
      get_riders_count_by_nation: {
        Args: never
        Returns: {
          nation_id: number
          rider_count: number
        }[]
      }
      get_riders_count_by_prev_nation: {
        Args: never
        Returns: {
          nation_id: number
          rider_count: number
        }[]
      }
      get_top_3_by_prev_nation: {
        Args: never
        Returns: {
          nation_id: number
          points: number
          rider_id: number
        }[]
      }
      get_top_3_riders_per_nation: {
        Args: never
        Returns: {
          nation_id: number
          nation_name: string
          points: number
          rider_id: number
          rider_name: string
        }[]
      }
    }
    Enums: {
      result_type:
        | "Sejr"
        | "Top 3"
        | "Top 5"
        | "Top 10"
        | "Bjergtr├©je"
        | "Pointtr├©je"
        | "1. dag i f├©rertr├©jen"
        | "2. dag i f├©rertr├©jen"
        | "3. dag i f├©rertr├©jen"
        | "├ÿvrig dag i f├©rertr├©jen"
        | "Etapesejr"
        | "Guld"
        | "S├©lv"
        | "Bronze"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      result_type: [
        "Sejr",
        "Top 3",
        "Top 5",
        "Top 10",
        "Bjergtr├©je",
        "Pointtr├©je",
        "1. dag i f├©rertr├©jen",
        "2. dag i f├©rertr├©jen",
        "3. dag i f├©rertr├©jen",
        "├ÿvrig dag i f├©rertr├©jen",
        "Etapesejr",
        "Guld",
        "S├©lv",
        "Bronze",
      ],
    },
  },
} as const
