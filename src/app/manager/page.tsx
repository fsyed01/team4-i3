import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Manager() {
  const teams = [
    {
      name: "Mosquitoes",
      href: "/mosquitoes/",
      logo: "/logos/Mosquitoes.jpeg",
    },
    { name: "Hyenas", href: "/hyenas", logo: "/logos/hyenas.jpeg" },
    { name: "Pacey Chickens", href: "/chickens", logo: "/logos/PCFC.jpeg" },
    {
      name: "Grass Kickers",
      href: "/grasskickers",
      logo: "/logos/grasskickers.jpeg",
    },
    { name: "Emus", href: "/emus", logo: "/logos/emus.jpeg" },
    {
      name: "Mocking Birds",
      href: "/mockingbirds",
      logo: "/logos/mockingbirds.jpeg",
    },
  ];

  return (
    <div>
      <h1>Managers</h1>
      <div className={styles.cardContainer}>
        {teams.map((team) => (
          <Link key={team.name} href={team.href} passHref>
            <div className={styles.card}>
              <div className={styles.logoWrapper}>
                <Image
                  src={team.logo}
                  alt={`${team.name} logo`}
                  width={100}
                  height={100}
                  layout="responsive"
                />
              </div>
              <div className={styles.teamName}>{team.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
