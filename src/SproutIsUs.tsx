import theme from "./emotion.d";
import {ThemeProvider} from "@emotion/react";
import {SubPage} from "./SubPage";


export function SproutIsUs() {
    return (
        <ThemeProvider theme={theme}>
            <SubPage
                heroImage={"annie-spratt-FSFfEQkd1sc-unsplash 1.png"}
                title={"Sprout is us"}>
                <p>
                    We’ve all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We’ve stayed on that path, with its ups and downs, following our passion for software.
                </p>
                <p>
                    Somewhere along that path we met people that made a mark. People that inspired and challenged us, made us better or simply put a smile on our face. People on our wavelength or that expand our perspectives. People that bring out the very best version of ourselves.After a while, we’ve realized it’s all about them.
                </p>
                <p>
                    Those people. Us. Sprout is a collaborative, creative platform that builds upon that insight.
                </p>
                <p>
                    We’ve built Sprout together, because we want to do this together. A shared journey with a shared responsibility. What we do and what Sprout will grow into - is up to us. Our aim is to renew ourselves, trying new things. We share experiences, setbacks and triumphs to push and inspire each other to move forward. In whatever way we grow or change, we’ll keep our <a href={"/roots"}>Sprout Roots</a> close and use our "gut-feeling" to guide our way.
                </p>
                <p>
                    With great knowledge and experience comes great responsibility. For us, it means staying humble and remaining open to new ideas and perspectives. With our feet steady on the ground, we’re always happy to help.
                </p>
            </SubPage>
        </ThemeProvider>
    );
}