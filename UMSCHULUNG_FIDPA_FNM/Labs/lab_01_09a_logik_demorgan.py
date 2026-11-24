"""
Lab LF 1.09a – Logik, Operatoren & De Morgan in Python
Ausführen im Terminal: python3 lab_01_09a_logik_demorgan.py
"""


def impl(a: bool, b: bool) -> bool:
    """Implikation A => B: nur True => False ist False."""
    return (not a) or b


def main() -> None:
    print("=== 1. Wahrheitstabelle: AND, OR, XOR, Implikation ===")
    print(" A | B | AND | OR | XOR | A=>B")
    print("---+---+-----+----+-----+-----")
    for a in (True, False):
        for b in (True, False):
            and_v = a and b
            or_v = a or b
            xor_v = a != b
            imp_v = impl(a, b)
            print(f" {int(a)} | {int(b)} |  {int(and_v)}  | {int(or_v)}  |  {int(xor_v)}  |  {int(imp_v)}")

    print("\n=== 2. De Morgan Check: Server-Alarm (CPU < 80% = A, RAM < 90% = B) ===")
    for cpu, ram in [(60, 70), (85, 60), (60, 95), (90, 95)]:
        a = cpu < 80
        b = ram < 90
        alarm_orig = not (a and b)
        alarm_demorgan = (not a) or (not b)
        assert alarm_orig == alarm_demorgan
        print(f"CPU={cpu}%, RAM={ram}% -> ¬(A∧B)={alarm_orig} | (¬A∨¬B)={alarm_demorgan}")


if __name__ == "__main__":
    main()
