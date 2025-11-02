namespace Prestigelisten.Integrations.GoogleSheets.Models;

public class GoogleSheetsOptions
{
    public const string SectionName = "GoogleSheets";

    public required string ApplicationName { get; set; }

    public required string SpreadsheetId { get; set; }

    public required string ServiceCredentialsJson { get; set; }

    public required RidersAllTimeSheetDetails RidersAllTimeSheet { get; set; }

    public required RidersActiveSheetDetails RidersActiveSheet { get; set; }

    public required NationsSheetDetails NationsSheet { get; set; }
}

public class RidersAllTimeSheetDetails
{
    public required string Range { get; set; }

    public required RidersAllTimeColumnIndexes ColumnIndexes { get; set; }
}

public class RidersAllTimeColumnIndexes
{
    public int Name { get; set; }

    public int Nation { get; set; }

    public int Year { get; set; }
}

public class RidersActiveSheetDetails
{
    public required string Range { get; set; }

    public required RidersActiveColumnIndexes ColumnIndexes { get; set; }
}

public class RidersActiveColumnIndexes
{
    public int Name { get; set; }

    public int Nation { get; set; }

    public int Year { get; set; }

    public int Team { get; set; }
}

public class NationsSheetDetails
{
    public required string Range { get; set; }

    public required NationsColumnIndexes ColumnIndexes { get; set; }
}

public class NationsColumnIndexes
{
    public int Name { get; set; }
}
