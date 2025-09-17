# Info

For å bruke denne må du ha docker installert lokalt.
Deretter migrere databellen med:

```bash
npm run migrate:new
npm run migrate:dev
npm run seed
```

Deretter kan du starte containeren med:

```bash
npm run dev
```

Hvis bugs prøv å stopp serveren og starte på nytt.
