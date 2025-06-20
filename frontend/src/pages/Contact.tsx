
import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { NavLink } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-psyco-black-light py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-psyco-orange-light mb-6 animate-fade-in">Get In Touch</h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100">
              Have a project in mind? Want to collaborate? Or just want to say hello? I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glassmorphism p-8">
              <h2 className="text-2xl font-bold text-psyco-orange-light mb-6">Send Me a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="bg-psyco-black-DEFAULT border-psyco-green-muted/50 bg-gray-900 text-orange-400 placeholder:text-gray-600"
                      placeholder="Akshat"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="bg-psyco-black-DEFAULT border-psyco-green-muted/50 bg-gray-900 text-orange-400 placeholder:text-gray-600"
                      placeholder="Jangid"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-psyco-black-DEFAULT border-psyco-green-muted/50 bg-gray-900 text-orange-400 placeholder:text-gray-600"
                    placeholder="akshatjangid14@gmail.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="bg-psyco-black-DEFAULT border-psyco-green-muted/50 bg-gray-900 text-orange-400 placeholder:text-gray-600"
                    placeholder="Project Collaboration"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="bg-psyco-black-DEFAULT border-psyco-green-muted/50 resize-none bg-gray-900 text-orange-400 placeholder:text-gray-600"
                    placeholder="Tell me about your project or what you'd like to discuss..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="glassmorphism p-8">
                <h2 className="text-2xl font-bold text-psyco-orange-light mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                      <p className="text-psyco-orange-light">akshatjangid14@gmail.com</p>
                      <p className="text-gray-400 text-sm">I typically respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                      <p className="text-psyco-orange-light">+91 7374927227</p>
                      <p className="text-gray-400 text-sm">Available Mon-Fri, 9AM-6PM IST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                      <p className="text-psyco-orange-light">Rajasthan, India</p>
                      <p className="text-gray-400 text-sm">Open to remote opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="glassmorphism p-8">
                <h2 className="text-2xl font-bold text-psyco-orange-light mb-6">Connect With Me</h2>
                
                <div className="space-y-4">
                  <a
                    href="https://github.com/AkshatJangid787"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-psyco-black-DEFAULT rounded-lg hover:bg-psyco-black-card transition-colors"
                  >
                    <Github className="h-6 w-6 text-psyco-green-DEFAULT" />
                    <div>
                      <h3 className="text-lg font-medium text-white hover:text-psyco-orange-light transition-colors">GitHub</h3>
                      <p className="text-gray-400 text-sm">Check out my projects and contributions</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/in/akshatjangid/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-psyco-black-DEFAULT rounded-lg hover:bg-psyco-black-card transition-colors"
                  >
                    <Linkedin className="h-6 w-6 text-psyco-green-DEFAULT" />
                    <div>
                      <h3 className="text-lg font-medium text-white hover:text-psyco-orange-light transition-colors">LinkedIn</h3>
                      <p className="text-gray-400 text-sm">Let's connect professionally</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://x.com/AkshatJangid777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-psyco-black-DEFAULT rounded-lg hover:bg-psyco-black-card transition-colors"
                  >
                    <Twitter className="h-6 w-6 text-psyco-green-DEFAULT" />
                    <div>
                      <h3 className="text-lg font-medium text-white hover:text-psyco-orange-light transition-colors">Twitter</h3>
                      <p className="text-gray-400 text-sm">Follow me for dev updates and insights</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-psyco-orange-light mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Common questions about working with me
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What's your development process?",
                answer: "I follow an agile approach with regular communication, clear milestones, and iterative development to ensure your project meets your expectations."
              },
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity. Simple websites take 1-2 weeks, while complex web applications can take 1-3 months. I'll provide a detailed timeline after understanding your requirements."
              },
              {
                question: "Do you work with teams or solo?",
                answer: "I work both independently and as part of teams. I'm comfortable collaborating with designers, other developers, and project managers."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "I specialize in React, TypeScript, Node.js, and modern web technologies. I'm always learning new tools to provide the best solutions."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, I offer maintenance and support services for projects I've developed. This includes bug fixes, updates, and feature additions."
              },
              {
                question: "What's your availability?",
                answer: "I'm currently available for new projects. I typically work Monday-Friday and aim to respond to messages within 24 hours."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="glassmorphism p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-medium text-white mb-2 hover:text-psyco-orange-light transition-colors">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
