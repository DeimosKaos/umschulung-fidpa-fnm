#!/usr/bin/env python3
"""Interaktives FNM-Lab zu LF 3.06: IPv4, bitweises UND, CIDR & Subnetting."""

import ipaddress


def zeige_netzberechnung(ip_str: str, prefix: int) -> None:
    """Berechnet Netzadresse, Broadcast und nutzbare Hosts aus IP + CIDR."""
    iface = ipaddress.IPv4Interface(f"{ip_str}/{prefix}")
    net = iface.network
    ip_bin = ".".join(f"{int(o):08b}" for o in ip_str.split("."))
    mask_bin = ".".join(f"{int(o):08b}" for o in str(net.netmask).split("."))
    net_bin = ".".join(f"{int(o):08b}" for o in str(net.network_address).split("."))

    print(f"\n=== Analyse: {ip_str}/{prefix} ===")
    print(f"IP (binär):         {ip_bin}")
    print(f"Maske (binär):      {mask_bin}  ({net.netmask})")
    print(f"AND -> Netzadresse: {net_bin}  ({net.network_address})")
    print(f"Broadcast-Adresse:  {net.broadcast_address}")
    hosts = list(net.hosts())
    if hosts:
        print(f"Nutzbare Hosts:     {hosts[0]} bis {hosts[-1]} (Anzahl: {len(hosts)})")
    else:
        print("Nutzbare Hosts:     0 (Sonderfall /31 oder /32)")


def zeige_subnetting(basis_cidr: str, neues_prefix: int) -> None:
    """Teilt ein Netz per Subnetting in gleich große Teilnetze auf."""
    net = ipaddress.IPv4Network(basis_cidr)
    subs = list(net.subnets(new_prefix=neues_prefix))
    print(f"\n=== Subnetting: {basis_cidr} -> /{neues_prefix} ({len(subs)} Teilnetze) ===")
    for i, s in enumerate(subs[:8], start=1):
        hosts = list(s.hosts())
        print(f"  {i}. {str(s):18s} | Hosts: {hosts[0]} – {hosts[-1]} ({len(hosts)}) | BC: {s.broadcast_address}")


if __name__ == "__main__":
    zeige_netzberechnung("192.168.0.37", 24)
    zeige_subnetting("139.17.0.0/16", 18)
    zeige_subnetting("146.20.0.0/16", 19)
