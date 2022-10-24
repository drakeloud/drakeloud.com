import React from "react";
import addToMailchimp, { MailchimpResponse } from 'gatsby-plugin-mailchimp';
import * as emailSignupCss from "./email-signup.module.scss";

interface EmailSignupProps { }

interface EmailSignupState {
    email: string;
    firstName: string;
    responseMessage: MailchimpResponse | undefined;
    loading: Boolean;
}

export default class EmailSignup extends React.Component<EmailSignupProps, EmailSignupState> {
    constructor(props: EmailSignupProps) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            responseMessage: undefined,
            loading: false
        };
    }

    handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        } as any);
    };

    handleSubmit = async (e: any) => {
        e.preventDefault();
        this.setState({ loading: true });
        const result = await addToMailchimp(this.state.email, { FNAME: this.state.firstName });
        console.log(result);
        this.setState({ responseMessage: result, loading: false });
    };

    render() {
        return (
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column">
                        <p className="title has-text-primary">
                            Want to be notified about new posts?
                        </p>
                        <p>
                            Then sign up to get posts directly to your email. You can opt-out at any time.
                        </p>
                    </div>
                </div>
                {
                    this.state.responseMessage === undefined ||
                        this.state.responseMessage.result === 'error' ? (
                        <form onSubmit={this.handleSubmit} className="columns">
                            <div className="column is-5">
                                <label className="label">Your Email</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="email"
                                        name="email"
                                        placeholder="Your email here..."
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="column is-5">
                                <label className="label">Your Name</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="firstName"
                                        placeholder="Your first name..."
                                        value={this.state.firstName}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={`column is-2 ${emailSignupCss.flex}`}>
                                <div className={`control ${emailSignupCss.bottom}`}>
                                    <button className={`button is-primary ${this.state.loading ? 'is-loading' : ''}`} type="submit">Subscribe</button>
                                </div>
                            </div>
                        </form>
                    ) : <></>
                }
                {
                    this.state.responseMessage && (
                        <div className={`${this.state.responseMessage.result === 'success' ? 'has-text-info' : 'has-text-danger'}`} dangerouslySetInnerHTML={{ __html: this.state.responseMessage.msg }}></div>
                    )
                }
            </div>
        )
    }
}
