import type { Metadata } from "next";
import { JetBrains_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto-mono",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["300", "400", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Nam Lê | Graduation Invitation & System Portal",
  description: "Trang thông tin lễ tốt nghiệp ngành Kỹ thuật Máy tính - Trường Đại học Công nghệ - ĐHQGHN của Nam Lê. Xem thiệp mời và gửi lời chúc/RSVP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${robotoMono.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
