import { graduationData } from "@/config/graduationData";
import { ThankYouClient } from "./ThankYouClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ recipient: string }> | { recipient: string };
}

// Pre-render static paths at build-time for lightning fast loading on Vercel
export async function generateStaticParams() {
  return [
    { recipient: "parents" },
    { recipient: "teachers" },
    { recipient: "friends" },
  ];
}

export default async function ThankYouPage({ params }: PageProps) {
  const resolvedParams = await params;
  const recipient = resolvedParams.recipient;

  const note = graduationData.thankYouNotes[recipient];
  if (!note) {
    notFound();
  }

  return <ThankYouClient recipient={recipient} note={note} />;
}
