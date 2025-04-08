import React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Delete, LoaderCircle } from 'lucide-react';

import { useCreateSocialMedia, useDeleteSocialMedia, useGetSocialMedia } from "@/hooks/socialmediahook"
import { Pencil } from "lucide-react"
export default function CreateForm() {

    const [open, setOpen] = React.useState(false)
    const [deletingId, setDeletingId] = React.useState(null);
    const [formData, setFormData] = React.useState({
        socialmedia: "",
        password: "",
    })
    const { mutateAsync: createMediaData, isPending } = useCreateSocialMedia()
    const { mutateAsync: deleteMediaData } = useDeleteSocialMedia()
    const { data: getMediaData, error, isLoading } = useGetSocialMedia()
    console.log(getMediaData, 'getMediaData');

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDelete = async (id) => {
        try {
            setDeletingId(id)
            await deleteMediaData(id)
        } finally {
            setDeletingId(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            createMediaData(formData)
        } finally {
            setOpen(false)
            setFormData({
                socialmedia: "",
                password: "",
            })
        }
    }

    if (isLoading) return <div className="text-center">Loading...</div>

    return (
        <>
            {/* className="flex justify-center  h-dvh flex-col gap-4 w-1/2 mx-auto "> */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className={'!text-white'}>Create </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Create
                        </DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <form
                            id="myForm"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid items-center gap-4">
                                <Label htmlFor="socialmedia" className="text-right">
                                    Social Media
                                </Label>
                                <Input type="text"
                                    onChange={handleChange}
                                    name="socialmedia"
                                    id="social"
                                />
                            </div>
                            <div className="grid  items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                    password
                                </Label>
                                <Input
                                    type="text"
                                    onChange={handleChange}
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </form>
                    </div>
                    <DialogFooter>
                        <Button
                            form="myForm"
                            type="submit"
                            className={'bg-black text-white cursor-pointer'}
                            disabled={isPending}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div>
                <h1 className="text-center text-2xl font-bold">Create Social Media</h1>
                <p className="text-center">Create a new social media account</p>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Social Media</TableHead>
                            <TableHead>Password</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getMediaData?.data?.map((item) => (
                            <TableRow key={item?.id}>
                                <TableCell className="font-medium">{item?.socialmedia}</TableCell>
                                <TableCell>{item?.password}</TableCell>
                                <TableCell className={'gap-3 flex'}>
                                    <Button
                                        className="cursor-pointer !bg-red-500 text-white"
                                        onClick={() => handleDelete(item?.id)}
                                        disabled={deletingId === item?.id}
                                    >
                                        {deletingId === item?.id ?
                                            <LoaderCircle className="h-4 w-4 animate-spin" /> : <Delete />}
                                    </Button>
                                    <Button
                                        className="cursor-pointer !bg-green-500 text-white"
                                        onClick={() => handleDelete(item?.id)}
                                        disabled={deletingId === item?.id}
                                    >
                                        < Pencil />
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>
        </>
    )
}