import styled from "@emotion/styled";
import {Gap1, Gap5} from "./Gap";
import Logo from "./Logo";


interface Props {
}

const Wrapper = styled.div`
  color: white;
  margin: 1rem;
`

const HorizontalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ToTheTop = styled.div`
  border-left: solid;
  padding-left: 10px;
  cursor: pointer;
  &:after {
    content: ' To the top'
  }
`

function GetInTouch({}: Props) {
    function scrollToTop() {
        window.scrollTo(0, 0)
    }

    return (
        <Wrapper>
            <p>Get in touch</p>
            <Gap1/>

            <p>
                +46777111222 <br/>
                info@wearesprout.se
             </p>

            <Gap5/>

            <HorizontalWrapper>
                <ToTheTop onClick={scrollToTop}/>
                <Logo/>
            </HorizontalWrapper>

        </Wrapper>
    );
}

export default GetInTouch;
