import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Twitter, Linkedin, Mail,Instagram,Youtube, Code, Palette, Rocket } from 'lucide-react';

export default function Developer() {
  const skills = [
    'Html', 'Css', 'Javascript', 
     '3D Graphics', 'Frontend Development', 'UI/UX Design'
  ];

  const projects = [
    {
      title: '3D Model Viewer',
      description: 'Interactive GLB model viewer with offline capabilities',
      tech: ['React', 'Three.js', 'WebGL']
    }
]
  return (
    <div className="min-h-screen bg-gradient-hero pt-16 lg:pt-20 pb-12">
      <div className="container mx-auto px-4 space-y-8 lg:space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto bg-gradient-card rounded-full flex items-center justify-center shadow-glow border-2 border-primary/20">
              <div className="w-20 h-20 lg:w-28 lg:h-28 bg-gradient-primary rounded-full flex items-center justify-center">
                <Code className="h-8 w-8 lg:h-12 lg:w-12 text-primary-foreground" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-6 h-6 lg:w-8 lg:h-8 bg-success rounded-full border-4 border-background flex items-center justify-center">
              <div className="" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Cyber Naveen
            </h1>
            <p className="text-lg lg:text-xl text-primary font-medium">
              3D Graphics,python developer & Frontend Developer,vibe coder😎
            </p>
            <p className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
              Passionate about creating immersive 3D experiences on the web. Specialized in 
              Three.js, WebGL, and modern frontend technologies to bring digital worlds to life.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
          <a href="https://github.com/Naveenhacking"> <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
			</a>
            <a href="https://youtube.com/@kgfhackers">
			<Button variant="outline" size="sm">
              <Youtube className="h-4 w-4 mr-2" />
              Youtube
            </Button>
			</a>
            <a href="https://instagram.com/kutty_rolex_naveen">
			<Button variant="outline" size="sm">
              <Instagram className="h-4 w-4 mr-2" />
             Instagram
            </Button>
			</a>
<a href="mailto:naveenk6326@gmail.com" about="blank" >        
		  <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
			</a>
          </div>
        </div>

        {/* About Section */}
        <Card className="p-6 lg:p-8 bg-gradient-card border-border shadow-card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground">About Me</h2>
          </div>
          
          <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground">
            <p>
              I'm a frontend developer with a passion for 3D graphics and interactive web experiences. 
              With overt, I specialize in creating performant, 
              beautiful applications that push the boundaries of what's possible in the browser.
            </p>
            <p>
              My journey started with traditional web development, but I quickly fell in love with 
              Three.js and WebGL. Since then, I've been dedicated to mastering the art of 3D web 
              development, creating everything from simple model viewers to complex interactive experiences.
            </p>
            <p>
              When I'm not coding, you can find me exploring new 3D modeling techniques, contributing 
              to open-source projects, or sharing knowledge with the developer community through 
              blog posts and tutorials.
            </p>
          </div>
        </Card>

        {/* Skills Section */}
        <Card className="p-8 bg-gradient-card border-border shadow-card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Palette className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Skills & Technologies</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Projects Section */}
        <Card className="p-8 bg-gradient-card border-border shadow-card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Rocket className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="p-6 bg-viewer-bg border-border hover:shadow-glow transition-all duration-300">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="outline"
                      className="text-xs border-primary/30 text-primary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Contact Section */}
        <Card className="p-8 bg-gradient-card border-border shadow-card text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Interested in collaborating on 3D web projects or need help bringing your ideas to life? 
            I'd love to hear from you.
          </p>
         <a href="mailto:naveenk6326@gmail.com">
		 <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300">
            <Mail className="h-4 w-4 mr-2" />
            Get In Touch
          </Button>
		  </a>
        </Card>
      </div>
    </div>
  );
}
