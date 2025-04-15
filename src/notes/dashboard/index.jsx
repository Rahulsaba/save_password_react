import { useLogout } from "@/auth/authHooks/authHooks";
import { Input } from "@/components/ui/input";
import { useCreateNotes, useGetNotes } from "@/hooks/notesHooks";
import useAuthStore from "@/store";

export default function Dashboard() {
    const logout = useAuthStore((state) => state.logout);
    const { mutateAsync: authLogout } = useLogout()
    const { mutateAsync: createNotes } = useCreateNotes()
    const { data: getNotesData, error, isLoading } = useGetNotes()

    console.log(getNotesData, 'getNotesData');

    const logoutSubmit = () => {
        logout();
        authLogout()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data, 'formData');
        createNotes(data)
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-4 justify-between">
                <div>
                    Dashboard
                    <button className="text-white" onClick={logoutSubmit}>Logout</button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className=" flex-col gap-2 flexy w-[500px] p-10">
                        <label htmlFor="title">title</label>
                        <Input type="text" name="title" id="title" />
                        <label htmlFor="content">content</label>
                        <Input type="text" name="content" id="content" />
                        <label htmlFor="links">links</label>
                        <Input type="text" name="links" id="links" />
                        <label htmlFor="account">account</label>
                        <Input type="text" name="account" id="account" />
                        <label htmlFor="passsowrd">passsowrd</label>
                        <Input type="text" name="passsowrd" id="passsowrd" />
                        <button type="submit" className="text-white">submit</button>
                    </form>
                </div>

                <div>
                    {
                        getNotesData?.data?.map((item) => {
                            return (
                                <div key={item?.id} className="flex-col gap-2 flexy w-[500px]">
                                    <p>{item?.title}</p>
                                    <p>{item?.content}</p>
                                    <p>{item?.links}</p>
                                    <p>{item?.account}</p>
                                    <p>{item?.passsowrd}</p>
                                </div>
                            )

                        })}
                </div>
            </div>



        </>
    )

}