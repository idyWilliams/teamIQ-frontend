import Image from 'next/image';
import React from 'react';

const SuccessStep = () => {
  const Icons = [
    { name: 'slack', src: '/images/slack.png' },
    { name: 'github', src: '/images/github.png' },
    { name: 'jira', src: '/images/jira.png' },
    { name: 'gitlens', src: '/images/gitlab.png' },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 pt-20 pb-20">
      <div className="flex items-center justify-center gap-6">
        {Icons.map(logo => (
          <Image
            key={logo.name}
            src={logo.src}
            alt={`${logo.name} logo`}
            width={48}
            height={48}
            className="object-contain"
          />
        ))}
      </div>
      <h1 className="text-3xl font-semibold text-[#141414]">
        Project successfully created
      </h1>
      <p className="text-lg font-normal">
        You can now track your activities on Team IQ
      </p>
    </div>
  );
};

export default SuccessStep;
