
Day of the Jekyll
-----------------

I've never seen the film or read the book, just wanted to make a terrible pun.

My new project is to make a new blog! Now you can tell that this hasn't got very far by the fact I'm posting this on my Wordpress.com blog. The new one is still only hosted locally on my laptop, but should be up on Github Pages soon. I'll probably keep posting here anyway until I'm reasonably happy with the new one...

The idea for the new blog is to host it on [Jekyll][jekyll], a static site generator which allows you to write new posts in Markdown and add them straight to your blog. Because the end result is a pre-generated static site, it loads very quickly and can also be hosted cheaply or for free. In particular, Github offers
[free hosting for Jekyll sites][githubjekyll]. I've been planning to learn to use `git` properly for a while now, and this is should motivate me to do it. Plus I should get more useful practice with HTML, CSS, terminal commands and whatever else comes up.

[jekyll]:http://jekyllrb.com/
[githubjekyll]:https://pages.github.com/

I'd seen a few Jekyll blogs around and liked the look of them: the default seems to be a clean, minimal design that's easily customisable ([here are some examples][jekyllexamples]). I was particularly inspired by [this blog by W. Caleb McDaniel][caleb], which turned up on Hacker News at some point and is about a hundred times nicer than most academics' blogs. Interesting that a history professor has out-geeked all the physicists and mathematicians. [Reading up][calebcol] a bit more, I realised that he's actually gone a good level further than I was planning and his site is not actually Jekyll but a static site generator he wrote himself, but the end result is definitely in the same style.

[jekyllexamples]:http://jekyllrb.com/docs/sites/

I was also very taken with his blog's colour scheme [Solarized][solarized] by Ethan Schoonover. I get occasional severe migraines and almost always have disturbances to my vision, like flickering and blind spots, before the headache starts. I think this has made me hyper-aware of flickering and afterimages in my normal vision, because I now find it hard to read off a bright white screen for any length of time. I've installed a browser plugin, [Change Colors][changecolors], to convert websites to light grey text on a dark grey background, and find this much easier to read (as an added bonus, it's useful when I come across a really eye-wateringly garish site). The Solarized colour scheme, however, is extremely readable, probably the best light colour scheme I've come across, and is very pretty too! So this is another thing I plan to take inspiration from for my own blog.


[changecolors]:http://www.chromeextensions.org/appearance-functioning/change-colors/#.VYQG4Y70_VM
[solarized]:http://ethanschoonover.com/solarized
[caleb]:http://wcm1.web.rice.edu/
[calebcol]:http://wcm1.web.rice.edu/colophon.html

My final reason for trying Jekyll is that I already really like Markdown. I used [LaTeX][latexproject] throughout my PhD, so I'm very used to writing documents in a text file. LaTeX is great when you actually need it (i.e., when you're typing out hundreds of equations), but is massive overkill for a simple text document, so when I discovered Markdown I was really pleased with it. It's also a lot more fun to type than HTML with all its irritating "<"s and ">"s. For me, the best thing is that adding links is so simple and frictionless that I'm much more motivated to reference things carefully and acknowledge all the sources I use. Typing out a load of HTML or LaTeX, or clicking buttons in a GUI feels like such a pain in comparison! Currently I write my posts in Markdown, and then copy and paste them into the Wordpress.com editor. It's rather a clunky system, and I don't really need the bloated set of features on Wordpress.com, so something simpler that I can customise as I go may suit me better.

[latexproject]:http://www.latex-project.org/

So, that's the plan anyway! I'm already running into a fair bit of hassle doing the blog migration, so I may be less optimistic about the process soon... As with the Zyring project, I plan to write up notes as I go, covering installing Jekyll, migrating my old blog, hosting on Github and customising the blog. This is mostly for my own benefit, for writing practice and future reference, but it may possibly be helpful to others. 

I have no idea how fast this will progress, because everything's a bit up in the air for me at the moment - my new job's been put back from August to October, and I've got to figure out what the hell I do until then. I definitely don't want to be paying two extra months' rent without a job! So at the moment I have loads of spare time, but I have no idea how that is going to change. Anyway I'll upload a contents page to the end of this introductory post as and when I add new material.



Installing Jekyll
=================

http://joshualande.com/jekyll-github-pages-poole/

Should point out now that... can just fork a github repository...

[jekyllnow]:https://github.com/barryclark/jekyll-now

Going to spell it all out. First I needed Ruby:

```
sudo apt-get install ruby-dev
```
Then the RubyGems package, which I installed from the [website][rubygems]

[rubygems]:https://rubygems.org/pages/download

Also you need NodeJS if you don't already have it.

Get some [error message][error], seems like it doesn't matter too much.

[error]:http://stackoverflow.com/questions/9562582/issue-occuring-while-installing-gem

Then I follow the instructions on the main page:

```
~ $ jekyll new my-awesome-site
~ $ cd my-awesome-site
~/my-awesome-site $ jekyll serve
# => Now browse to http://localhost:4000

```
Sorted! I have a blog template:

Migrating
=========

Exporting old blog
------------------

xml file from wordpress

Migration with Jekyll
---------------------

dependency hell - I had to install a bunch of things including `rvm`, `zlib` and `hpricot`.

Most images got copied across to a file called `assets`. A few didn't and I got errors to tell me this - copied them across manually.

I now have this migrated blog:

!!insert image

Not bad, although things don't look so brilliant when I click on an individual post...

!!insert image

So the images aren't loading - I'll deal with this later when I put this blog on Github. Also there's some guff in the header and at the beginning of each post.

I discover that `post.html` in the `_layouts` folder generates the first type of guff, and tweak it so that it just displays the date and not the other stuff I don't want.

There are some other things that aren't working... code snippets and some bits of formatting like bulletpoints aren't working

Cleaning up the migration
=========================

Code snippets
------------

Info here:
http://jekyllrb.com/docs/posts/

Time to learn some regular expressions using [these tutorials][regextut]

[regextut]:http://regexone.com/

These could also be useful:

Working with strings
http://opentechschool.github.io/python-data-intro/core/strings.html

Markdown to html example
http://pythontesting.net/python/regex-search-replace-examples/

Still need to update:

Zyring 10 - Callback Tuesdays
Zyring 7 - lists of apartments



Images
------

MathJax
-------

http://docs.mathjax.org/en/latest/tex.html

Copy:

<script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'></script>

into `head.html` file in `_layouts` folder.

Hosting on Github
=================

Setting up
----------

I get a new account at Github with username `wotidun`, and then start following the [instructions] to set it up.

[instructions]:https://help.github.com/articles/set-up-git/


I already have `git` installed (I think for the Zyring project) but if not on Ubuntu it would be a straightforward case of 

{% highlight bash %}
sudo apt-get install git
{% endhighlight %}

Then I tell `git` my name: 

{% highlight bash %}
git config --global user.name "wotidun"
{% endhighlight %}

{% highlight bash %}
git config --global user.email "my_email"
{% endhighlight %}

Creating a repository
---------------------

According to the [GitHub Pages instructions][ghpages], the next thing I need to do is create a repository with the name `wotidun.github.io`. I need to give it this exact name (with my username) if I want to create a site with the name 'wotidun.github.io' rather than a 'project site' for a specific project.

I follow the instructions [here.][createrepo]

Next I clone the repository into the folder I want to save the project in:

{% highlight bash %}
git clone https://github.com/wotidun/wotidun.github.io
{% endhighlight %}

Then I add an `index.html` page: 

{% highlight bash %}
cd username.github.io
echo "Hello World" > index.html
{% endhighlight %}
and add, commit and push my changes (guess I'd better read the tutorial on this sometime):

{% highlight bash %}
git add --all
git commit -m "Initial commit"
git push -u origin master
{% endhighlight %}
Now, I *should* be able to go to `http://wotidun.github.io' and view this page, but for some stupid reason this library has blocked GitHub. Helpful! So I'll just have to assume I have a nice 'Hello World' page.


[ghpages]:https://pages.github.com/
[createrepo]:https://pages.github.com/



Customising the blog
====================

Themes
------

I used this:

http://thomasf.github.io/solarized-css/




*** possible links to use

Dealing with the lack of images problem:

http://blog.8thcolor.com/en/2014/05/migrate-from-wordpress/

These notes may also be helpful:

http://www.smashingmagazine.com/2014/08/01/build-blog-jekyll-github-pages/


Analytics
---------

Tidying up the content
----------------------

Adding 'Next' 'Previous'

Responsive design?
------------------




