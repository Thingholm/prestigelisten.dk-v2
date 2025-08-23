## Update Supabase types
```bash
npx supabase gen types typescript --project-id "ijyqomzpcigbnwjjohrd" --schema public > ./www/src/utils/supabase/database.types.ts
```

Change encoding from UTF-16 to UTF-8 before building.

In VS Code click in bottom right corner UTF-16 > Save with encoding > UTF-8