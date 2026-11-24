---
lf: "LF 1"
sub_lf: "LF 1.09a"
type: "lab"
nlm_id: "174709d0-b98b-430b-b015-437582224f3f"
nlm_url: "https://notebooklm.google.com/notebook/174709d0-b98b-430b-b015-437582224f3f"
tags:
  - fnm-lab
  - ap1
  - python
---

# 🧪 Lab LF 1.09a: Logik, Operatoren & De Morgan in Python

> [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09a_Logik_Aussagen_Verknuepfungen_De_Morgan|← Zurück zu LF 1.09a]] · [[../00_Dashboard_SecondBrain_FNM|🏠 Dashboard]]

*(Mit dem Community-Plugin **Execute Code** kannst du diesen Block direkt in Obsidian ausführen, oder im Terminal mit `python3 Labs/lab_01_09a_logik_demorgan.py`.)*

```python
def impl(a: bool, b: bool) -> bool:
    """Implikation A => B: nur True => False ist False."""
    return (not a) or b


print("=== 1. Wahrheitstabelle: AND, OR, XOR, Implikation ===")
print(" A | B | AND | OR | XOR | A=>B")
print("---+---+-----+----+-----+-----")
for a in (True, False):
    for b in (True, False):
        print(f" {int(a)} | {int(b)} |  {int(a and b)}  | {int(a or b)}  |  {int(a != b)}  |  {int(impl(a, b))}")

print("\n=== 2. De Morgan Check: Server-Alarm (CPU < 80% = A, RAM < 90% = B) ===")
for cpu, ram in [(60, 70), (85, 60), (60, 95), (90, 95)]:
    a = cpu < 80
    b = ram < 90
    alarm_orig = not (a and b)
    alarm_demorgan = (not a) or (not b)
    assert alarm_orig == alarm_demorgan
    print(f"CPU={cpu}%, RAM={ram}% -> ¬(A∧B)={alarm_orig} | (¬A∨¬B)={alarm_demorgan}")
```
