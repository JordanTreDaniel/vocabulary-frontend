import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/actions'
const mapStateToProps = (state) => ({ user: state.userInfo })

const mapDispatchToProps = (dispatch) => ({ signOut: () => dispatch(signOut()) })
class NavigationMenu extends React.Component {
    state = { activeItem: this.props.location.pathname }

    render() {
        const { activeItem } = this.state
        return (
            <Segment inverted id="navigation-menu">
                <Menu inverted pointing secondary>
                    <Menu.Item
                        name='categories'
                        active={activeItem === '' || activeItem === 'categories'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='terms'
                        active={activeItem === 'terms'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='tags'
                        active={activeItem === 'tags'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='signup'
                        active={activeItem === 'signup'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu
                        position="right"
                    >
                        <Menu.Item
                            as={this.renderDropdown}
                        />
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name }, () => {
            this.props.history.push(`/${name}`)
        })
    }

    showAvatar = () => {
        return (
            <div
                className="user-thumbnail"
                style={{ "backgroundImage": `url(${this.props.user["avatar_url"]})` }}
            ></div>
        )
    }
    renderDropdown = () => {
        return (
            <>
                <Dropdown trigger={this.showAvatar()}
                >
                    <Dropdown.Menu>
                        <Dropdown.Header>{`Signed in as ${this.props.user.username}`}</Dropdown.Header>
                        <Dropdown.Divider />
                        {
                            this.props.user.username !== "Guest" ?
                                <Dropdown.Item text='Sign Out' onClick={this.props.signOut} />
                                :
                                null
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);