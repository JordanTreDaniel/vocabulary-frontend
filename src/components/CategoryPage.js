import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'
import CategoryList from './CategoryList';
import TermContainer from './TermContainer';
import { connect } from 'react-redux';
import {
    fetchCategories,
    selectCategory,
} from '../actions/actions.js'


const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    selectCategory: (idx) => dispatch(selectCategory(idx)),
})
const mapStateToProps = (state) => {
    debugger
    return ({
        selectedCategoryIndex: state.selectedCategoryIndex,
        categories: state.categories,
        category: state.categories[state.selectedCategoryIndex]
    })
}




/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as='h1'
            content='Imagine-a-Company'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='Do whatever you want when you want to.'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size='huge'>
            Get Started
      <Icon name='right arrow' />
        </Button>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item as='a' active>
                                    Home
                </Menu.Item>
                                <Menu.Item as='a'>Work</Menu.Item>
                                <Menu.Item as='a'>Company</Menu.Item>
                                <Menu.Item as='a'>Careers</Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted={!fixed}>
                                        Log in
                  </Button>
                                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                                        Sign Up
                  </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyMobile.maxWidth}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as='a' active>
                        Home
          </Menu.Item>
                    <Menu.Item as='a'>Work</Menu.Item>
                    <Menu.Item as='a'>Company</Menu.Item>
                    <Menu.Item as='a'>Careers</Menu.Item>
                    <Menu.Item as='a'>Log in</Menu.Item>
                    <Menu.Item as='a'>Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 350, padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted>
                                        Log in
                  </Button>
                                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                        Sign Up
                  </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

class CategoryPage extends React.Component {
    createCategory = () => {
        this.props.history.push('/categories/new')
    }

    componentWillMount = () => {
        this.props.fetchCategories();
    }

    render = () => {
        return (
            < ResponsiveContainer >
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Responsive style={{ minHeight: "100%" }}>
                        <Grid
                            container
                            text-align
                            divided
                            stretched
                        >
                            <Grid.Row>
                                <Button onClick={this.createCategory}>New Category</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <CategoryList
                                        categories={this.props.categories}
                                        selectCategory={id => this.props.selectCategory(id)}
                                        initialIndex={this.props.selectedCategoryIndex}
                                    />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <TermContainer cards={this.props.category.cards} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Responsive>
                </Segment >
            </ResponsiveContainer >
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);