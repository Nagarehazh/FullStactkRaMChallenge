import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Character } from "@/types";
import { CustomButton } from "@/components";

interface CharacterDetailProps {
    isOpen: boolean;
    closeModal: () => void;
    ram: Character;
}

const CharacterDetail = ({ isOpen, closeModal, ram }: CharacterDetailProps) => {
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        // Aquí implementarías la lógica para añadir el comentario
        console.log("Añadiendo comentario:", newComment);
        setNewComment("");
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-out duration-300"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                                    onClick={closeModal}
                                >
                                    <Image
                                        src="/close.svg"
                                        alt="close"
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                    />
                                </button>

                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="relative w-full h-60 bg-pattern bg-cover bg-center rounded-lg">
                                        <Image
                                            src={ram.image}
                                            alt="character img"
                                            fill
                                            priority
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col gap-2">
                                    <h2 className="font-semibold text-xl capitalize">
                                        {ram.name}
                                    </h2>

                                    <div className="mt-3 flex flex-wrap gap-4">
                                        {Object.entries(ram).map(([key, value]) => (
                                            key !== 'id' && key !== 'image' && key !== 'favorites' && key !== 'comments' && (
                                                <div
                                                    className="flex justify-between gap-5 w-full text-right"
                                                    key={key}
                                                >
                                                    <h4 className="text-grey capitalize">
                                                        {key.split("_").join(" ")}
                                                    </h4>
                                                    <p className="text-black-100 font-semibold truncate max-w-[40ch]">
                                                        {value}
                                                    </p>
                                                </div>
                                            )
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="font-semibold text-lg mb-2">Comentarios</h3>
                                        <div className="max-h-40 overflow-y-auto mb-4">
                                            {ram.comments.length > 0 ? (
                                                ram.comments.map((comment) => (
                                                    <div key={comment.id} className="bg-gray-100 p-2 rounded mb-2">
                                                        <p>{comment.content}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500">No hay comentarios aún.</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder="Escribe un comentario..."
                                                className="flex-grow p-2 border rounded"
                                            />
                                            <CustomButton
                                                title="Comentar"
                                                containerStyles="bg-primary-blue text-white rounded-full px-4 py-2 hover:bg-blue-600"
                                                handleClick={handleAddComment}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CharacterDetail;