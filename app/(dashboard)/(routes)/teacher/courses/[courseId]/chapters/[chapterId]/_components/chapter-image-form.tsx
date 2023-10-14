"use client"

import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Chapter, MuxData } from "@prisma/client"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"
import ReactPlayer from "react-player"

interface ChapterVideoFormProps {
    initialData: Chapter & {muxData? : MuxData | null}
    courseId: string
    chapterId : string
}

const formSchema = z.object({
    videoUrl: z.string().min(3)
})

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {
    // declaration variable or something

    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter()

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, value)
            toast.success("Chapter Updated")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex font-medium items-center justify-between">
                Chapter video
                <Button onClick={toggleEdit} variant={"ghost"}>
                    {isEditing && (
                        <>
                            Cancel
                        </>
                    )}  
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an video
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit video
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="text-slate-500 h-10 w-10" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        {/* <ReactPlayer url={initialData.videoUrl} controls config={} /> */}
                    </div>
                )
            ) : (
                <div className="">
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if(url) {
                                onSubmit({videoUrl : url})
                            }
                        }}
                    />
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Video can take a few minute to process. refresh the page if video not appear
                </div>
            )}
        </div>
    )
}