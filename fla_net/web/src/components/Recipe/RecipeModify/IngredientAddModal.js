import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextGroup from '../../BaseForm/TextGroup';
import From from '../../BaseForm/Form';
import Submit from '../../BaseForm/Submit';

function SubstitutesModal(props) {
    return (
        <div>
            <Modal
                isOpen={props.show}
                modalTransition={{ timeout: 20 }}
                backdropTransition={{ timeout: 10 }}
                toggle={props.toggle}
                style={{ margin: '25vh auto' }}
                className={props.className}>
                <ModalHeader toggle={props.toggle}>Add custom ingredient</ModalHeader>
                <ModalBody>
                    <small>Note! This ingredient is not yet supported by our recommendation
                        systems and you will not be able to get substitutes or recommendations
                        involving it.</small>
                    <From handleSubmit={props.ingredientSubmit}>
                        <TextGroup
                            name="name"
                            label="Name"
                            type="text"
                            handleChange={props.handleChange}
                            value={props.ingredient.name} />
                        <Submit value="Add" />
                    </From>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}


export default SubstitutesModal;
