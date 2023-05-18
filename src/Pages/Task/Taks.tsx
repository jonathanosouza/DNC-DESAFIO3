import React, { useState } from "react"
import '../Task/TaskStyle.scss'
import { Trash, PencilSimple, Plus, Check } from "@phosphor-icons/react"
import Modal from "../../Components/Modal";
import { useTheme } from "@emotion/react";

export function Taks({ datas }) {

    interface isEdit {
        iseditOpen: boolean | null;
    }

    interface DataProps {
        id: number
        title: string,
        description: string,
        completed: boolean
    }

    const [db, setDB] = useState<DataProps[]>(datas)
    const [iseditOpen, setIsEditOpen] = useState<isEdit>(null)
    const [iscompleted, setIsCompleted] = useState(false)
    const [newtask, setNewTask] = useState("Adicionar Aplicação")
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isModalTitle, setModalTitle] = useState("")
    const [isModalItem, setModalItem] = useState("")
    const [isModalid, setdataModalId] = useState("")
    const [isModalButton, setIsModalButton] = useState(false)

    const changeInputTaskAdd = (e) => {
        if (e.key === "Delete") {
            setNewTask(""); // Apaga o valor do input
        }
    }

    const handleAddtDB = (event) => {
        event.preventDefault()
        const lastId = db.reduce((maxId, obj) => {
            return obj.id > maxId ? obj.id : maxId;
        }, 0);
        setDB([...db, { "id": lastId + 1, "title": newtask, "description": newtask, "completed": setIsCompleted(false) }]
        )
        setNewTask("Adicionar Aplicação"); // Apaga o valor do input
        console.log(db)
    }

    const handleYesClick = (isModalid) => {
        setIsModalButton(true)
        if (isModalButton && isModalTitle === "Deseja Realmente Excluir esse Item?") {
            console.log("Cheguei até A exclusão")
            setDB(preventDB => preventDB.filter(data => data.id !== isModalid))
            setIsOpenModal(false)
        } else {
            if (isModalButton && isModalTitle === "Deseja Realmente Editar esse Item?") {
                if (isOpenModal) {
                    setDB(prevDb => {
                        const updatedDb = prevDb.map(data => {
                            if (data.id === isModalid) {
                                return {

                                    ...data,
                                    isEditing: true
                                };
                            }
                            return data;
                        });
                        return updatedDb;
                        
                    });
                }
            }
            setIsOpenModal(!isOpenModal)
        }
    }

    const handleNoClick = () => {
        setIsOpenModal(!isOpenModal)
    }

    const handleDeleteItem = (id: number) => {
        if (!isOpenModal) {
            setIsOpenModal(true)
            setModalTitle("Deseja Realmente Excluir esse Item?")
            const modalItem = db.find(data => data.id === id)
            if (modalItem) {
                setModalItem(modalItem.description)
                setdataModalId(modalItem.id)
            }
            console.log("Cheguei até a seleção do item")
        }
    }

    const changeInputTaskEdit = (id: number, value: EventTarget) => {
        setDB(prevDb => {
            const updatedDb = prevDb.map(data => {
                if (data.id === id) {
                    return {
                        ...data,
                        description: value
                    };
                }
                return data;
            });
            return updatedDb;
        });
    }

    const handleEditItem = (id: number) => {
        if (true) {
            setIsOpenModal(true)
            setModalTitle("Deseja Realmente Editar esse Item?")
            const modalItem = db.find(data => data.id === id)
            if (modalItem) {
                setModalItem(modalItem.description)
                setdataModalId(modalItem.id)
            }
        }

    }

    const handleSaveItem = (id: number) => {
        setDB(prevDb => {
            const updatedDb = prevDb.map(data => {
                if (data.id === id) {
                    return {
                        ...data,
                        isEditing: false,
                    };
                }
                return data;
            });
            return updatedDb;
        })
        setIsEditOpen(null)
    }

    return (
        <>
            {/* //     {isOpenModal ? <div className="ModalCointainer" >
        //         <div className="ModalProps">
        //             <h1>{isModalTitle}</h1>
        //             <span>{isModalItem}</span>
        //             <div className="buttonProps">
        //                 <button onClick={() => handleNoClick()}>Não</button>
        //                 <button onClick={handleYesClick}>Sim</button>
        //             </div>
        //         </div>
        //     </div>
        //     : '' } */}

            <Modal
                title={isModalTitle}
                modal={isOpenModal}
                dbItem={isModalItem}
                dbId={isModalid}
                modalYes={handleYesClick}
                modalNo={handleNoClick} />
            <div className="TaskContainer">
                <div>
                    <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
                </div>
                <div className="TaskList">
                    <table className="tableList">
                        <tr className="titleList">
                            <th>Tarefas</th>
                            <th>Status</th>
                            <th>Opções</th>
                        </tr>
                        {db.map((data) => {
                            return ( <>
                                <tr className="taksListItem" key={data.id} iseditOpen={iseditOpen}>
                                    <td key={data.id}>
                                        <input
                                            type="text"
                                            value={data.description}
                                            onChange={(event) => changeInputTaskEdit(data.id, event.target.value)}
                                            readOnly={!data.isEditing} // Adicione a propriedade readOnly para impedir a edição quando não estiver no modo de edição
                                            ref={(inputRef) => {
                                                if (data.isEditing && inputRef) {
                                                    inputRef.focus();
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input type="checkbox"/>
                                    </td>
                                    <td>
                                        <div className="buttonList">
                                            <button onClick={() => (data.isEditing ? handleSaveItem(data.id) : handleEditItem(data.id))}>
                                                {data.isEditing ? (
                                                    <Check size={32} color="white" />
                                                ) : (
                                                    <PencilSimple size={32} color="white" />
                                                )}
                                            </button>
                                            <button onClick={() => handleDeleteItem(data.id)}>
                                                <Trash size={32} color="white" />
                                            </button>
                                        </div>
                                    </td>
                                </tr></>
                            );
                        })}
                        <tr>
                            <td><input
                                type="text"
                                value={newtask}
                                onChange={(e) => {
                                    setNewTask(e.target.value)
                                }}
                                onKeyDown={changeInputTaskAdd}
                            /></td>
                            <td></td>
                            <td>
                                <div className="buttonAddList">
                                    <button onClick={() => handleAddtDB(event)}><Plus size={32} color="white" /></button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}