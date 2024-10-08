import { FC } from "react";
import { FileUser, Github } from "lucide-react";

export const HomeFooter: FC = () => (
  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href=""
      target="_blank"
    >
      <FileUser strokeWidth={1.5} />
      Perfect candidate
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href=""
      target="_blank"
    >
      <Github strokeWidth={1.5} />
      Source code →
    </a>
  </footer>
);
