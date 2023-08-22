import theme from "./emotion.d";
import { ThemeProvider } from "@emotion/react";
import { SubPage } from "./SubPage";

export function TheVision() {
    return (
        <ThemeProvider theme={theme}>
            <SubPage heroImage={"annie-spratt-FSFfEQkd1sc-unsplash 1.png"} title={"The vision"}>
                <p>In a field were new technologies, practices and trends changes frequently - one key factor always stays relevant. People.</p>
                <p>
                    We created Sprout for and around a group of people who work great together. We may be different - but we share a common commitment of
                    creating business value, a thirst for knowledge a will to improve. We share a passion for the work we do. We want to get better together.
                    Most importantly - humility, compassion and kindness are always front-and-center.{" "}
                </p>
                <p>
                    At the heart, Sprout consists of experienced software professionals, experts in digitalization and development. With a proven track-record
                    as entrepreneurs, this core provides us with both a competitive edge and a sound foundation.With that said - we are not complete. We want to
                    expand Sprout with new ideas, innovations and initiatives. People and companies that share our view and want to take that next step
                    forward.We want to be inspired and to inspire. We want to improve and help others improve. We want to make that journey together.
                </p>
                <p>
                    By expanding the Sprout family with new collaborations, new companies and ideas, we keep growing as people and as an organization. We create
                    a more diverse offering for our customers, enable new partnerships and provide richer experience for any project we take on.{" "}
                </p>
                <p>We grow, improve and succeed together.</p>
            </SubPage>
        </ThemeProvider>
    );
}
