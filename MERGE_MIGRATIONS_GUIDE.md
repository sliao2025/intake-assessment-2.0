# Merging Migrations Across Branches

## Scenario: You have schema changes in different branches

### Step-by-Step Process

#### 1. **Before Merging - Check What's Different**

```bash
# See what migrations exist in the other branch
git log main --oneline -- prisma/migrations/

# See schema differences
git diff main -- prisma/schema.prisma
```

#### 2. **Merge the Branch**

```bash
# From your current branch
git merge main
```

#### 3. **If Conflicts Occur in schema.prisma**

**Option A: Keep Both Changes (Recommended)**
- Open `prisma/schema.prisma`
- Manually merge both sets of changes
- Keep all models and fields from both branches
- Resolve any duplicate or conflicting definitions

**Option B: Choose One Version**
```bash
# Keep your version
git checkout --ours prisma/schema.prisma

# OR keep their version
git checkout --theirs prisma/schema.prisma
```

#### 4. **After Resolving Conflicts - Create Reconciliation Migration**

```bash
# Prisma will detect the schema changes
npx prisma migrate dev --name merge_branch_changes

# This creates a new migration that:
# - Applies any new changes from the merged schema
# - Reconciles differences between branches
```

#### 5. **Verify Everything Works**

```bash
# Check migration status
npx prisma migrate status

# Regenerate Prisma Client
npx prisma generate

# Test your application
npm run dev
```

## Important Rules

1. **Never delete migration files** - They're history
2. **Always commit migrations with schema** - They go together
3. **Create new migrations for conflicts** - Don't edit old ones
4. **Test after merging** - Ensure database and code are in sync

## Common Scenarios

### Scenario A: You added a field, they added a different field
✅ **Solution**: Keep both fields in schema.prisma, migration will add both

### Scenario B: You both added the same field differently
✅ **Solution**: Choose one definition, or merge them if compatible

### Scenario C: You modified a field, they deleted it
⚠️ **Solution**: Decide which change to keep, create migration accordingly

### Scenario D: You have migrations they don't, they have migrations you don't
✅ **Solution**: 
- Merge brings all migration files
- Run `prisma migrate deploy` to apply any you're missing
- Prisma tracks which are applied in `_prisma_migrations` table

## Quick Reference

```bash
# See migration status
npx prisma migrate status

# Apply pending migrations (safe, won't create new ones)
npx prisma migrate deploy

# Create and apply new migration (development only)
npx prisma migrate dev --name migration_name

# Pull schema from database (doesn't help with migrations!)
npx prisma db pull  # ⚠️ Only updates schema.prisma, not migration files
```

## Troubleshooting

### "Migration X is missing"
- The migration file doesn't exist locally but is in the database
- **Fix**: Recreate the migration file or mark it as applied

### "Drift detected"
- Database schema doesn't match migration history
- **Fix**: 
  1. Check if schema.prisma matches database
  2. If yes, create missing migration files
  3. If no, create migration to sync them

### "Migration conflicts"
- Two branches created migrations with same timestamp
- **Fix**: 
  1. Rename one migration folder
  2. Update checksum in `_prisma_migrations` table
  3. Or create a new migration that reconciles both

