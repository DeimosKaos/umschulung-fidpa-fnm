"""
Lab LF 1.09b – Mengenlehre in Python (set) & SQL (SQLite)
Ausführen im Terminal: python3 lab_01_09b_mengen_sql.py
"""
import sqlite3


def main() -> None:
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


if __name__ == "__main__":
    main()
