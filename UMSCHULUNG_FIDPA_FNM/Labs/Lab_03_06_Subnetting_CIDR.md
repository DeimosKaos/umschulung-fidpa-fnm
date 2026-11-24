---
lf: LF 3
sub_lf: LF 3.06
type: lab
nlm_id: "1ff0b183-2dc9-434c-ac5d-9e218d1e9f66"
nlm_url: "https://notebooklm.google.com/notebook/1ff0b183-2dc9-434c-ac5d-9e218d1e9f66"
tags: [fnm-lab, ap1, lf03]
---

[[../00_Dashboard_SecondBrain_FNM|🏠 Dashboard]] › [[../AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.06_TCP_IP_Netzzugang_IPv4_Adressierung_Subnetting|📖 Zurück zu LF 3.06]]

# 🧪 Lab 03.06 – IPv4, bitweises UND, CIDR & Subnetting

Dieses Mini-Lab ergänzt [[../AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.06_TCP_IP_Netzzugang_IPv4_Adressierung_Subnetting|LF 3.06]] praktisch: Du siehst direkt binär, wie die Teilnetzmaske per bitweisem `AND` die Netzadresse isoliert und wie aus `/16` per Subnetting `/18` oder `/19` entsteht.

## Ausführen
```bash
python3 Labs/lab_03_06_subnetting.py
```

## Selbst-Experiment (für AP1-Routine)
1. Ändere in `lab_03_06_subnetting.py` die Werte auf ein eigenes Beispiel (z. B. `196.17.41.0/24` → `/26` oder `/27` wie beim VLSM-Beispiel aus Kersken).
2. Rechne zuerst **im Kopf / auf Papier** Netzadresse, Broadcast und nutzbare Host-Anzahl ($2^h - 2$) aus – und prüfe erst danach mit dem Skript!
