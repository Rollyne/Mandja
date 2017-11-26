import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge } from 'reactstrap';

const SubstitutesModal = props => (
    <div>
        <Modal
            isOpen={props.show}
            modalTransition={{ timeout: 20 }}
            backdropTransition={{ timeout: 10 }}
            toggle={props.toggle}
            style={{ margin: '20vh auto' }}
            className={props.className}>
            <ModalHeader toggle={props.toggle}><b>{props.ingredient}</b> can be substituted with</ModalHeader>
            <ModalBody>
                <ListGroup>
                    <ListGroupItem className="justify-content-between">Cras justo odio <Badge pill>14</Badge></ListGroupItem>
                    <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge pill>2</Badge></ListGroupItem>
                    <ListGroupItem className="justify-content-between">Morbi leo risus <Badge pill>1</Badge></ListGroupItem>
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Ok</Button>
            </ModalFooter>
        </Modal>
    </div>
        );


export default SubstitutesModal;
