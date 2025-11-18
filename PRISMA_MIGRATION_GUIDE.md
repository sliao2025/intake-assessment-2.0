# Prisma Migration Best Practices

## Standard Workflow for Schema Changes

### 1. **Making Schema Changes**

When you need to modify the database schema:

1. **Edit `prisma/schema.prisma`** - Make your changes to the schema file
2. **Create and apply migration:**
   ```bash
   npm run db:migrate
   # or
   npx prisma migrate dev --name descriptive_migration_name
   ```

   This will:
   - Create a new migration file in `prisma/migrations/`
   - Apply it to your local database
   - Regenerate the Prisma Client

3. **Review the generated migration** - Always check the SQL in the migration file to ensure it's correct

4. **Test your changes** - Verify everything works with your updated schema

5. **Commit everything:**
   ```bash
   git add prisma/schema.prisma
   git add prisma/migrations/
   git commit -m "feat: add new field to User model"
   ```

### 2. **What to Commit**

✅ **ALWAYS commit:**
- `prisma/schema.prisma` - Your schema definition
- `prisma/migrations/` - All migration files (these are the source of truth)
- `prisma/migrations/migration_lock.toml` - Database provider lock

❌ **NEVER commit:**
- `prisma/dev.db` or any database files (already in .gitignore)
- `.env` files with database credentials

### 3. **Working with a Team**

#### When pulling changes from others:

1. **Pull the latest code:**
   ```bash
   git pull origin main
   ```

2. **Install dependencies (if needed):**
   ```bash
   npm install
   ```

3. **Apply new migrations:**
   ```bash
   npm run db:migrate:deploy
   # or for development:
   npm run db:migrate
   ```

4. **Regenerate Prisma Client:**
   ```bash
   npm run db:generate
   ```

#### If you have local schema changes that conflict:

1. **Check migration status:**
   ```bash
   npm run db:migrate:status
   ```

2. **Resolve conflicts:**
   - If you have uncommitted migrations, commit them first
   - Pull the latest changes
   - If there are conflicts in `schema.prisma`, resolve them manually
   - Create a new migration to reconcile differences:
     ```bash
     npm run db:migrate --name resolve_conflicts
     ```

### 4. **Different Environments**

#### Development (Local)
```bash
# Create and apply migrations
npm run db:migrate

# Quick sync without creating migration (for rapid prototyping)
npm run db:push
```

#### Staging/Production
```bash
# Apply pending migrations (doesn't create new ones)
npm run db:migrate:deploy
```

**Important:** Never run `prisma migrate dev` in production! Always use `prisma migrate deploy`.

### 5. **Common Scenarios**

#### Scenario A: Quick Prototyping
If you're rapidly iterating and don't need migration history:
```bash
npm run db:push
```
⚠️ **Warning:** This doesn't create migration files. Only use for local development.

#### Scenario B: Schema Drift Detection
If you see drift warnings:
```bash
# Check what's different
npm run db:migrate:status

# If schema matches DB but migration is missing (like we just fixed):
# 1. Create the missing migration file
# 2. Update the checksum in _prisma_migrations table
```

#### Scenario C: Reset Development Database
If you need to start fresh (⚠️ **DELETES ALL DATA**):
```bash
npm run db:reset
```

#### Scenario D: View Database in Browser
```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555

### 6. **Best Practices Checklist**

- ✅ Always create migrations for schema changes (don't use `db push` in production)
- ✅ Use descriptive migration names: `add_user_email_index`, `create_clinic_table`
- ✅ Review migration SQL before committing
- ✅ Test migrations on a copy of production data if possible
- ✅ Keep migrations small and focused (one logical change per migration)
- ✅ Never edit migration files after they've been applied to production
- ✅ Always commit both `schema.prisma` AND the migration files together
- ✅ Run `prisma generate` after pulling changes that include schema updates
- ✅ Use `migrate deploy` in CI/CD pipelines, not `migrate dev`

### 7. **Troubleshooting**

#### "Migration X was modified after it was applied"
- The migration file's checksum doesn't match what's in the database
- **Solution:** Update the checksum in `_prisma_migrations` table (see our earlier fix)

#### "Drift detected"
- Database schema doesn't match migration history
- **Solution:** 
  1. Check if schema.prisma matches the actual database
  2. If yes, create missing migration files
  3. If no, create a new migration to sync them

#### "Migration failed to apply"
- Check the error message
- Manually fix the database if needed
- Mark migration as rolled back: `prisma migrate resolve --rolled-back <migration_name>`
- Fix the migration file and try again

### 8. **CI/CD Integration**

In your deployment pipeline:

```yaml
# Example GitHub Actions / CI step
- name: Run migrations
  run: |
    npm install
    npx prisma generate
    npx prisma migrate deploy
```

### 9. **Quick Reference Commands**

| Command | When to Use |
|---------|-------------|
| `npm run db:migrate` | Create and apply new migration (dev) |
| `npm run db:migrate:deploy` | Apply pending migrations (prod/staging) |
| `npm run db:migrate:status` | Check migration status |
| `npm run db:push` | Quick sync without migration (dev only) |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:studio` | Open database browser |
| `npm run db:reset` | Reset database (⚠️ deletes data) |

---

## Summary: The Golden Rules

1. **Always use migrations** for schema changes (except rapid local prototyping)
2. **Commit migrations with schema changes** - they're part of your codebase
3. **Never edit applied migrations** - create new ones instead
4. **Use `migrate deploy` in production**, never `migrate dev`
5. **Pull → Migrate → Generate** when syncing with team changes

