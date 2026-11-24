---
lf: "LF 1"
sub_lf: "LF 1.09b"
type: "lab"
nlm_id: "174709d0-b98b-430b-b015-437582224f3f"
nlm_url: "https://notebooklm.google.com/notebook/174709d0-b98b-430b-b015-437582224f3f"
tags:
  - fnm-lab
  - ap1
  - python
  - sql
---

# 🧪 Lab LF 1.09b: Mengenlehre in Python (`set`) & SQL (`SQLite`)

> [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09b_Mengenlehre_Mengenoperationen_SQL_Python|← Zurück zu LF 1.09b]] · [[../00_Dashboard_SecondBrain_FNM|🏠 Dashboard]]

*(Mit dem Community-Plugin **Execute Code** kannst du diesen Block direkt in Obsidian ausführen, oder im Terminal mit `python3 Labs/lab_01_09b_mengen_sql.py`.)*

```python
import sqlite3

# 1. Python Sets
m_kaeufer = {"Anna", "Ben", "Clara"}
n_newsletter = {"Ben", "Clara", "David"}

print("=== 1. Python Sets ===")
print("Schnittmenge (M ∩ N):", m_kaeufer & n_newsletter)
print("Vereinigung  (M ∪ N):", m_kaeufer | n_newsletter)
print("Differenz    (M \\ N):", m_kaeufer - n_newsletter)

# 2. SQLite (SQL Mengenoperationen)
conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE kaeufer (name TEXT)")
cur.execute("CREATE TABLE newsletter (name TEXT)")
cur.executemany("INSERT INTO kaeufer VALUES (?)", [(x,) for x in m_kaeufer])
cur.executemany("INSERT INTO newsletter VALUES (?)", [(x,) for x in n_newsletter])

print("\n=== 2. SQLite (SQL) ===")
for label, query in [
    ("INTERSECT (M ∩ N)", "SELECT name FROM kaeufer INTERSECT SELECT name FROM newsletter"),
    ("UNION     (M ∪ N)", "SELECT name FROM kaeufer UNION SELECT name FROM newsletter"),
    ("EXCEPT    (M \\ N)", "SELECT name FROM kaeufer EXCEPT SELECT name FROM newsletter"),
]:
    rows = sorted(r[0] for r in cur.execute(query).fetchall())
    print(f"{label}: {rows}")
conn.close()
```
