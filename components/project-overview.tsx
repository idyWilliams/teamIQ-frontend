import ProgresWithDate from './progres-with-date';
import IconList from './ui/icon-list';
import LinkedDocs from './linked-docs';
import AiSummary from './ai-summary';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';
const dummyStacks = [
  { imgSrc: '/images/nodejs.png', stack: 'NodeJS' },
  { imgSrc: '/images/figma.png', stack: 'Figma' },
  { imgSrc: '/images/html.png', stack: 'HTML' },
  { imgSrc: '/images/css.png', stack: 'CSS' },
];
const dummyApps = [
  { imgSrc: '/images/slack.png', stack: 'Slack' },
  { imgSrc: '/images/github.png', stack: 'Github' },
  { imgSrc: '/images/Jira.png', stack: 'Jira' },
  { imgSrc: '/images/gitlab.png', stack: 'Gitlab' },
];

const dummyLinkedDocs = [
  'Software Requirements Specification (SRS).pdf',
  'Project_Plan.docx',
  'Design_Mockups.sketch',
];

const ProjectOverview = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen gap-[32px] p-[24px]">
      {/* Left hand side containing Descriptions and documents*/}
      <div className="flex w-[100%] flex-col gap-[32px] overflow-scroll [scrollbar-width:none] md:w-[793px] lg:w-[70%] [&::-webkit-scrollbar]:hidden">
        {isMobile && (
          <div>
            <AiSummary />
          </div>
        )}

        <div>
          <div className='flex justify-between items-center mb-4'>
            {' '}
            <h2 className="mb-[12px] text-[14px] font-bold lg:text-[16px]">
              Description
            </h2>
            <Button className="bg-[#086ACE] px-[24px] py-[16px] text-[14px] text-[#FFFFFA]">
              Edit Project
            </Button>
          </div>
          <p className="text-[13px] leading-relaxed lg:text-[14px]">
            Lorem ipsum dolor sit amet consectetur. Sed est vel id gravida orci
            nascetur tincidunt amet. Vestibulum eu sagittis ac elementum nam
            lacus. Nisi viverra dolor a tortor tellus. Netus blandit vitae
            mattis lacus volutpat cursus. Non lobortis massa fringilla elit ut
            fusce tincidunt quisque turpis. Sed aliquam arcu pellentesque augue
            augue. Gravida purus eget sed vitae laoreet viverra. Nec feugiat
            amet elementum etiam urna euismod.Sit proin risus amet sagittis
            mattis pretium ultrices quam sapien. Volutpat nunc sem sed aliquet
            elementum amet. Ut posuere sagittis integer laoreet luctus.
            Suspendisse odio tellus at mauris tincidunt tempor gravida. Tellus
            pretium ultricies ornare enim pretium curabitur sem. Congue gravida
            at tortor est. Ut metus ipsum ac elementum. Consequat lorem semper
            id in purus aenean massa luctus. Sit euismod nullam imperdiet non
            vulputate aliquam. Sapien orci nisi sed pharetra sit scelerisque
            sociis amet. Diam quis felis blandit mattis a amet in a nisi. Felis
            porta at in sed. Amet vulputate sed et scelerisque mi sollicitudin
            aliquam morbi. Adipiscing velit quis nibh sit
          </p>
        </div>
        <div>
          <h2 className="mb-[12px] text-[14px] font-bold lg:text-[16px]">
            Project Timeline
          </h2>
          <ProgresWithDate
            date="1st May - 24th June 2025"
            percentageProgress={8}
          />
        </div>
        <div>
          <h2 className="mb-[12px] text-[14px] font-bold lg:text-[16px]">
            Required Stacks
          </h2>
          <IconList data={dummyStacks} />
        </div>
        <div>
          <h2 className="mb-[12px] text-[14px] font-bold lg:text-[16px]">
            Integrated Apps
          </h2>
          <IconList data={dummyApps} />
        </div>
        <div>
          <h2 className="mb-[12px] text-[14px] font-bold lg:text-[16px]">
            Linked Documents
          </h2>
          <LinkedDocs data={dummyLinkedDocs} />
        </div>
      </div>

      {/* Right hand side containing Ai summary */}
      {!isMobile && (
        <div className="flex w-[100%] flex-col gap-[13px] rounded-[8px] p-[24px] shadow-[-1px_2px_30px_0px_#0000000D] md:w-[382px] lg:w-[30%]">
          <div className="flex items-center">
            <span className="icon-[fluent--sparkle-48-filled] size-5"></span>
            <h2 className="text-[18px] font-bold">AI summary</h2>
          </div>

          <AiSummary />
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;
