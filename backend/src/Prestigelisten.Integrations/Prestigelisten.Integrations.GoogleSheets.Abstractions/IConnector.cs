using Google.Apis.Sheets.v4.Data;

namespace Prestigelisten.Integrations.GoogleSheets.Abstractions;

public interface IConnector
{
    ValueRange? GetAllTimeSheetValues();
}
