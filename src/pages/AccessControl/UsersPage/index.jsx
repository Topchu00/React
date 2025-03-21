import { useEffect, useState } from "react"
import { Dialog } from "primereact/dialog";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UsersService } from "../../../entities/users"

export default function UsersPage() {
    const {getUsers} = UsersService()

    const [users, setUsers] = useState([])
    const [selectedUser, setselectedUser] = useState(null)
    const [isShowUserDetails, setisShowUserDetails] = useState(false)

    const fetchUsers = async () => {
        const arr = await getUsers()
        console.log({arr});
        setUsers([...arr])
    }

    const onSelectionChange = (evt) => {
        setselectedUser(evt.value)
        setisShowUserDetails(true)
    }

    useEffect(() => {
        fetchUsers()

        console.log(users);
        
    }, [])



    return (
        <>
            <DataTable value={users} selectionMode='single' selection={selectedUser} onSelectionChange={onSelectionChange}>
                <Column field="id" header="UserId"></Column>
                <Column field="username" header="UserName"></Column>
                <Column field="name" header="FullName"></Column>
                <Column field="phone" header="UserPhone"></Column>
                <Column field="email" header="UserEmail"></Column>
                <Column field="website" header="UserWebSite"></Column>
            </DataTable>

            <Dialog visible={isShowUserDetails} onHide={() => setisShowUserDetails(false)}>
                {JSON.stringify(selectedUser)}
            </Dialog>
        </>
    )
}