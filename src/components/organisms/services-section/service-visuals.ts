export interface ServiceVisual {
  url: string;
  alt: string;
}

const unsplashParams = 'auto=format&fit=crop&crop=entropy&w=1600&h=1000&q=80';

function buildUnsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${unsplashParams}`;
}

const serviceVisuals: ServiceVisual[] = [
  {
    url: buildUnsplashUrl('photo-1522202176988-66273c2fd55f'),
    alt: 'Consultants collaborating around a laptop in a workshop setting',
  },
  {
    url: buildUnsplashUrl('photo-1677442136019-21780ecad995'),
    alt: 'Abstract AI visualization on a computer display',
  },
  {
    url: buildUnsplashUrl('photo-1517048676732-d65bc937f952'),
    alt: 'Project team planning together around a conference table',
  },
  {
    url: buildUnsplashUrl('photo-1522071820081-009f0129c71c'),
    alt: 'Cross-functional team collaborating around a table',
  },
  {
    url: buildUnsplashUrl('photo-1553028826-f4804a6dba3b'),
    alt: 'Advisory conversation in a lounge setting with notes and discussion',
  },
  {
    url: buildUnsplashUrl('photo-1498050108023-c5249f4df085'),
    alt: 'Startup workspace with laptop, sketches, and product planning',
  },
];

export function getServiceVisual(index: number): ServiceVisual {
  return serviceVisuals[index] ?? serviceVisuals[0];
}
