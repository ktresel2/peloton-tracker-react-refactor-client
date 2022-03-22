import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactItem from './ContactItem'
import Spinner from './../layout/Spinner'
import ContactContext from './../../context/contact/contactContext'

const Contacts = () => {
	const contactContext = useContext(ContactContext)

	const { contacts, filtered, getContacts, loading } = contactContext

	useEffect(() => {
		getContacts()
	}, [])

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact</h4>
	}

	return (
		<Fragment>
			{contacts && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map(contact => (
								<CSSTransition
									timeout={1000}
									classNames="item"
									key={contact._id}
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map(contact => (
								<CSSTransition
									timeout={100}
									classNames="item"
									key={contact._id}
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}

export default Contacts
