function ImageWithAsideText() {
  return (
    <div className="flex gap-10 w-4/6">
      <img
        src="https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg"
        className="radius-10 basis-1/2 object-cover "
      />
      <aside className="mt-10 basis-1/2">
        <h2 className="text-left">How we </h2>
        <h2 className="text-right">came to be</h2>
        <p>
          We've all been in the business for a few years. Colleagues have come
          and gone, projects and companies have changed in a world where
          technology is ever evolving. We've stayed on that path, with its ups
          and downs, following our passion for software. Somewhere along that
          path we met people that made a mark. People that inspired and
          challenged us, made us better or simply put a smile on our face.
          People on our wavelength or that expand our perspectives. People that
          bring out the very best version of ourselves. After a while, we've
          realized it's all about them. Those people. Us. Sprout is a
          collaborative, creative platform that builds upon that insight.
        </p>
      </aside>
    </div>
  );
}

export default ImageWithAsideText;
