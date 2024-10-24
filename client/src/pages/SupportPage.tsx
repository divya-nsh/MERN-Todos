import { Envelope, GithubLogo, TwitterLogo } from "@phosphor-icons/react";

export default function HelpAndFeedback() {
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-neutral-800 mb-6">
        Help & Feedback
      </h1>

      <div className="bg-white border rounded-lg p-6">
        <p className="text-lg text-neutral-700 mb-4">
          If you have any issues, questions, or feedback, feel free to reach out
          to me. I'd love to hear from you!
        </p>

        <div className="space-y-4">
          {/* Contact via Email */}
          <a
            href="mailto:divyanshsoni279@gmail.com"
            className="flex items-center space-x-3 text-blue-600 hover:underline"
          >
            <Envelope className="w-6 h-6" weight="bold" />
            <span>divyanshsoni279@gmail.com</span>
          </a>

          {/* GitHub Source Code */}
          <a
            href="https://github.com/your-github-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-blue-600 hover:underline"
          >
            <GithubLogo className="w-6 h-6" weight="bold" />
            <span>View the source code on GitHub</span>
          </a>

          {/* Twitter Profile */}
          <a
            href="https://twitter.com/divyansh_soni_0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-blue-600 hover:underline"
          >
            <TwitterLogo className="w-6 h-6" weight="bold" />
            <span>Follow me on Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}
