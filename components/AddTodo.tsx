import useTodoStore from "@/store/useStore";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
//Disabled because not compatible with nextjs
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useMediaQuery } from "@uidotdev/usehooks"; //Disabled because not compatible with nextjs

const AddTodo: React.FC = () => {
  const {
    addTodo,
    editTodo,
    addEditOpen,
    setAddEditOpen,
    selectedTask,
    selectedDate,
  } = useTodoStore();

  const [text, setText] = useState<string>(selectedTask?.text || "");
  const [subtext, setSubtext] = useState<string>(selectedTask?.subtext || "");
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (selectedTask) {
      setText(selectedTask.text);
      setSubtext(selectedTask.subtext);
    }
  }, [selectedTask]);

  const handleSubmit = () => {
    if (text.trim() && subtext.trim()) {
      if (selectedTask) {
        // Editing an existing todo
        editTodo(selectedTask.id, { text, subtext }, selectedTask.date);
      } else {
        // Adding a new todo
        addTodo(
          {
            text,
            subtext,
          },
          selectedDate
        );
      }
      setText("");
      setSubtext("");
      setAddEditOpen(false);
    }
  };

  //Disabled because not compatible with nextjs
  // if (isDesktop) {
  //   return (
  //     <Dialog open={addEditOpen} onOpenChange={setAddEditOpen}>
  //       <DialogTrigger asChild>
  //         <Button
  //           variant="ghost"
  //           className="shadow-lg text-4xl font-light rounded-full flex items-center justify-center w-16 h-16 bottom-4"
  //         >
  //           +
  //         </Button>
  //       </DialogTrigger>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle>{selectedTask ? "Edit Task" : "Add Task"}</DialogTitle>
  //           <DialogDescription>
  //             {selectedTask ? "Make changes to the task" : "Add a new task"}
  //           </DialogDescription>
  //         </DialogHeader>
  //         <ProfileForm
  //           text={text}
  //           setText={setText}
  //           subtext={subtext}
  //           setSubtext={setSubtext}
  //         />

  //         <Button onClick={handleSubmit}>
  //           {selectedTask ? "Save" : "Add"}
  //         </Button>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  return (
    <>
      <Drawer open={addEditOpen} onOpenChange={setAddEditOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className="shadow-lg text-4xl font-light rounded-full flex items-center justify-center w-16 h-16"
          >
            +
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                {selectedTask ? "Edit Task" : "Add Task"}
              </DrawerTitle>
              <DrawerDescription>
                {selectedTask
                  ? "Make changes to the task"
                  : "Add a new task to your list"}
              </DrawerDescription>
            </DrawerHeader>
            <ProfileForm
              text={text}
              setText={setText}
              subtext={subtext}
              setSubtext={setSubtext}
            />
            <DrawerFooter>
              <Button onClick={handleSubmit}>Add</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddTodo;

function ProfileForm({
  text,
  setText,
  subtext,
  setSubtext,
}: {
  text: string;
  setText: (text: string) => void;
  subtext: string;
  setSubtext: (subtext: string) => void;
}) {
  return (
    <div className="p-4 pb-0">
      <div className="flex">
        <div className="flex-1 text-center">
          <div className="flex flex-col gap-2 mb-4">
            <Label
              className="self-start uppercase font-bold tracking-tight text-xs"
              htmlFor="label"
            >
              Label
            </Label>
            <Input
              type="text"
              id="label"
              placeholder="Send Abhishek the details of the next round"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-4 ">
            <Label
              className="self-start uppercase font-bold tracking-tight text-xs"
              htmlFor="description"
            >
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Write a description for the task"
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
