import Template from "../components/Template"
import BlogsSection from "../sections/BlogsSection"
import HeroSections from "../sections/heroSections"


const HomePages = () => {
    return (
        <Template>
            <HeroSections />
            <BlogsSection />
        </Template>
    )
}

export default HomePages
