import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transforme Seus Resultados | Plataforma Empresarial Líder",
  description: "Mais de 15.000 empresas economizando milhões com nossa plataforma. 98.7% de satisfação, implementação em 48h. Teste grátis por 14 dias!",
  keywords: "plataforma empresarial, gestão de negócios, economia empresarial, ROI, produtividade",
  openGraph: {
    title: "Transforme Seus Resultados em Lucro Real",
    description: "Junte-se a 15.000+ empresas que já economizaram R$ 487M",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
=======
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
>>>>>>> Stashed changes
=======
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
>>>>>>> Stashed changes
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
