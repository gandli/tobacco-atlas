"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation("common");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("notFound.title")}</p>
        <p className="mb-4 text-sm text-muted-foreground">{t("notFound.description")}</p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          {t("notFound.backHome")}
        </Link>
      </div>
    </div>
  );
}
