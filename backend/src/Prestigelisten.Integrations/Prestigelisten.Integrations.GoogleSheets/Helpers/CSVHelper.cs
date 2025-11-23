using System.Reflection;

namespace Prestigelisten.Integrations.GoogleSheets.Helpers;

public static class CSVHelper
{
    private static readonly Assembly _assembly = Assembly.GetExecutingAssembly();
    private const string _namespace = "Prestigelisten.Integrations.GoogleSheets";

    public static async Task<string> ReadAsStringAsync(string resourcePath)
    {
        var resourceName = $"{_namespace}.{resourcePath.Replace("/", ".")}";

        await using var stream = _assembly.GetManifestResourceStream(resourceName);
        if (stream is null)
        {
            throw new FileNotFoundException("Could not find {resourceName}", resourceName);
        }

        using var reader = new StreamReader(stream);
        return await reader.ReadToEndAsync();
    }
}
