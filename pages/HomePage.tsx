
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {

  const specials = [
    { name: "Truffle Risotto", description: "Creamy Arborio rice with black truffle and Parmesan cheese.", image: "https://picsum.photos/seed/risotto/600/400" },
    { name: "Seared Scallops", description: "With a lemon-butter caper sauce and asparagus.", image: "https://picsum.photos/seed/scallops/600/400" },
    { name: "Lava Cake", description: "Molten chocolate cake with a raspberry coulis.", image: "https://picsum.photos/seed/lavacake/600/400" },
  ];

  const testimonials = [
    { name: "Jane Doe", quote: "An absolutely unforgettable dining experience. The ambiance and the food were perfect.", avatar: "https://picsum.photos/seed/jane/100/100" },
    { name: "John Smith", quote: "The best steak I've ever had. I'll be coming back for more, without a doubt!", avatar: "https://picsum.photos/seed/john/100/100" },
  ];

  return (
    <div className="text-brand-light">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/restaurant/1920/1080')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white leading-tight mb-4">Savor the Art of Fine Dining</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">Discover a symphony of flavors crafted with passion and the finest ingredients.</p>
          <div className="space-x-4">
            <Link to="/menu" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-accent transition duration-300">View Menu</Link>
            <Link to="/reservation" className="bg-transparent border-2 border-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-primary transition duration-300">Book a Table</Link>
          </div>
        </div>
      </section>

      {/* About Us Summary */}
      <section className="py-20 bg-brand-secondary">
        <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://picsum.photos/seed/chef/800/600" alt="Our Chef" className="rounded-lg shadow-2xl"/>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-primary mb-4">Our Story</h2>
            <p className="mb-4 text-brand-light/80">
              Founded in 2010, Gourmet Grove was born from a passion for combining traditional recipes with modern culinary techniques. We believe in farm-to-table freshness and an unwavering commitment to quality.
            </p>
            <p className="text-brand-light/80">
              Our chefs work with local purveyors to source the best seasonal ingredients, ensuring every dish is a masterpiece of flavor and artistry.
            </p>
          </div>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-primary mb-12">Today's Specials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specials.map((special, index) => (
              <div key={index} className="bg-brand-secondary rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <img src={special.image} alt={special.name} className="w-full h-56 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-light mb-2">{special.name}</h3>
                  <p className="text-brand-light/70">{special.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-brand-secondary">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-primary mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-brand-dark p-8 rounded-lg shadow-lg">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-brand-primary"/>
                <p className="text-brand-light/80 italic mb-4">"{testimonial.quote}"</p>
                <h4 className="font-bold text-brand-light">- {testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
