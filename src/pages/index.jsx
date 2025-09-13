import Image from "next/image";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Bienvenue sur KineXperience</h1>
      <p>Votre plateforme sport, santé et performance</p>
      <Image src="/logo-kinexperience.png" alt="Logo KineXperience" width={200} height={200} />
    </div>
  );
}
