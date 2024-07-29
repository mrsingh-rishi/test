import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";
import { MdDelete, MdOutlineSort } from "react-icons/md";
import { BACKEND_URL } from "../variable";

export type CardType = {
  id?: string;
  status?: string;
  title?: string;
  description?: string;
  priority?: string;
  date?: string;
  onDelete?: (id: string) => void;
};

const Card: NextPage<CardType> = ({
  id,
  status,
  title,
  description,
  priority,
  date,
  onDelete,
}) => {
  const router = useRouter();

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful deletion (e.g., show a success message or refresh the list)
        onDelete?.(id); // Call onDelete callback
        console.log("Task deleted successfully");
        return true;
      } else {
        // Handle errors (e.g., show an error message)
        console.error(data.message || "Failed to delete task");
        return false;
      }
    } catch (error) {
      console.error("An unexpected error occurred while deleting the task");
      return false;
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-[16px] min-w-[193px] max-w-[257px] text-left text-xl text-dimgray-200 font-inter">
      <div className="self-stretch rounded-lg bg-whitesmoke-100 flex flex-col items-start justify-start p-3 gap-[16px] text-base text-dimgray-100 border-[1px] border-solid border-gainsboro-200">
        <div className="self-stretch flex flex-col items-start justify-start gap-[13px]">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="w-full flex justify-end gap-4">
              <span
                onClick={() => {
                  router.push(
                    `/create?id=${id}&status=${status}&title=${title}&description=${description}&priority=${priority}&date=${date}`
                  );
                }}
                className="cursor-pointer"
              >
                <HiOutlinePencil className="text-xl" />
              </span>
              <span
                onClick={() => deleteTask(id || "")}
                className="cursor-pointer"
              >
                <MdDelete className="text-xl" />
              </span>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
              <div className="self-stretch relative text-xl">{title}</div>
              <div className="self-stretch relative text-sm text-gray-300">
                {description}
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-salmon flex flex-row items-center justify-center py-1.5 px-2 text-xs text-white">
            {status === "in progress" ? (
              <div className="relative inline-block min-w-[39px] p-2 rounded-lg bg-orange-500 text-white">
                {status}
              </div>
            ) : (
              <div className="relative inline-block min-w-[39px] p-2 rounded-lg bg-red-600 text-white">
                {status}
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-[8px] text-sm">
            <LuClock3 className="h-6 w-6 relative overflow-hidden shrink-0" />
            <div className="relative font-semibold inline-block min-w-[83px]">
              {date}
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start py-0 pr-[178px] pl-0 gap-[20px] text-sm text-gray-300">
          <div className="relative font-medium inline-block min-w-[53px] whitespace-nowrap">
            2 days ago
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
