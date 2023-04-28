import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, FormControl, FormLabel,
    Input, Box
} from "@chakra-ui/react";
import { useState } from "react";
import { Service } from "../services/Service"


const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {

    const [id] = useState(dataEdit.id || 0);
    const [nome, setNome] = useState(dataEdit.nome || "");
    const [apelido, setApelido] = useState(dataEdit.apelido || "");
    const [corPredominante, setCorPredominante] = useState(dataEdit.cor_predominante || "");

    const handleSave = () => {
        const service = new Service();

        if (!nome || !apelido || !corPredominante) return;

        if (apelidoAlreadyExists() || nomeAlreadyExists())
            return alert("Nome ou apelido já cadastrado!")

        if (Object.keys(dataEdit).length) {
            service.alterar({ id, nome, apelido, corPredominante }).then(response => {
                setData(response.data)
            }).catch(error => {
                console.error(error)
            });
        } else {
            service.CriarTime({ id, nome, apelido, corPredominante }).then(response => {
                setData(response.data)
            }).catch(error => {
                console.error(error)
            });
        }

        onClose();
    };

    const apelidoAlreadyExists = () => {
        if (dataEdit.apelido !== apelido && data?.length) {
            return data.find((item) => item.apelido === apelido);
        }
        return false;
    };

    const nomeAlreadyExists = () => {
        if (dataEdit.nome !== nome && data?.length) {
            return data.find((item) => item.nome === nome);
        }
        return false;
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Equipe</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)} />
                            </Box>
                            <Box>
                                <FormLabel>Apelido</FormLabel>
                                <Input type="text"
                                    value={apelido}
                                    onChange={(e) => setApelido(e.target.value)} />
                            </Box>
                            <Box>
                                <FormLabel>Cor Predominante</FormLabel>
                                <Input type="text"
                                    value={corPredominante}
                                    onChange={(e) => setCorPredominante(e.target.value)} />
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleSave} >Salvar</Button>
                        <Button colorScheme="red" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default ModalComp;