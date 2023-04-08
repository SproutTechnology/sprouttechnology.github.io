import Accordion from './components/Accordion';
import Layout from './components/Layout';
import { ModernUiSprites } from './icons/ModernUiSprites';

function App() {
  return (
    <Layout>
      <div className="h-screen bg-stone-400 items-center justify-center flex flex-col gap-6">
        <div className="wrapper-accordion">
          <Accordion
            panels={[
              {
                title: 'Contact',
                content: 'Ipsam placeat dicta voluptas illo.',
                imageSrc: 'images/sara.jpeg',
                imageAlt: 'Sara Ljungberg från Sprout',
                svgSpritesIconId: 'phone',
              },
              {
                title: 'Sales',
                content: 'Nihil incidunt laborum quis.',
                imageSrc: 'images/oliver.jpeg',
                imageAlt: 'Oliver Stanisic från Sprout',
                svgSpritesIconId: 'share',
              },
              {
                title: 'Development',
                content: 'Quo ab necessitatibus enim.',
                imageSrc: 'images/simon.jpeg',
                imageAlt: 'Simon Arvidsson från Sprout',
                svgSpritesIconId: 'java',
              },
              {
                title: 'Ideas',
                content:
                  'Tempora sed labore dolores similique sunt ex laborum iure.',
                imageSrc: 'images/joseph.jpeg',
                imageAlt: 'Joseph Chambochumbi från Sprout',
                svgSpritesIconId: 'lightbulb',
              },
              {
                title: 'Consultancy',
                content:
                  'Ipsam non aspernatur quo accusamus sequi non consectetur magnam ut.',
                imageSrc: 'images/johan.jpeg',
                imageAlt: 'Johan Gustafsson från Sprout',
                svgSpritesIconId: 'csharp',
              },
            ]}
            svgSprites={<ModernUiSprites />}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
