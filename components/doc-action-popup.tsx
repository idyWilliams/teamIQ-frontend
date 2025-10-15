import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const DocActionPopup = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="icon-[ep--more] ml-auto size-5 cursor-pointer"></span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative z-10 w-[122px] h-[120px] bg-white rounded-[8px] flex flex-col gap-[22px] p-[24px] shadow-[0px_8px_24px_0px_#959DA533]">
        <DropdownMenuItem className="cursor-pointer text-popover-foreground focus:outline-none hover:text-gray-500">
          Download
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive cursor-pointer focus:outline-none hover:text-red-400">
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocActionPopup;
