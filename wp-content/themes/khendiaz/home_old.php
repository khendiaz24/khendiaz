<?php get_header(); ?>
	<section id="main-wrapper">
    <div id="home" class="layer layer1 bp-rel" data-stellar-background-ratio="0.4">
      <div class="auto bp-center bp-rel anim-content" data-stellar-ratio="0.5">
        <div class="logo"><img src="<?php bloginfo('template_url')?>/images/home/logo.png" width="113" height="103" alt="" title="" /></div>
				<?php
				   $post = get_page($id=2);
				   $title = apply_filters('the_title', $post->post_title);
				   $content = apply_filters('the_content', $post->post_content);
				?>
        <h1><?php echo $title; ?></h1>
        <h4><?php echo $content; ?></h4>
      </div>
			<div class="scrolldown bp-center">
				<span class="s-arrow1"></span>
				<span class="s-arrow2"></span>
			</div>
    </div>

		<div id="aboutMe" class="layer layer2 bp-rel">
			<div class="auto bp-center anim-content">
				<?php
				   $post = get_page($id=26);
				   $title = apply_filters('the_title', $post->post_title);
				   $subtitle = apply_filters('about_sub_title', $post->about_sub_title);
				   $content = apply_filters('the_content', $post->post_content);
				?>
				<h2><?php echo $title; ?></h2>
				<h3><?php echo $subtitle; ?></h3>
				<p><?php echo $content; ?></p>
			</div>
		</div>

		<div id="mySkills" class="layer layer3 bp-rel" data-stellar-background-ratio="0.4">
			<div class="auto bp-center anim-content bp-rel" data-stellar-ratio="0.4">
				<?php
				   $post = get_page($id=53);
				   $title = apply_filters('the_title', $post->post_title);
				   $subtitle = apply_filters('my_skills_sub_title', $post->my_skills_sub_title);
				   $content = apply_filters('the_content', $post->post_content);
				   $html = apply_filters('html', $post->html);
				   $css = apply_filters('css', $post->css);
				   $javascript = apply_filters('javascript', $post->javascript);
				   $photoshop = apply_filters('javascript', $post->photoshop);
				?>
				<h2><?php echo $title; ?></h2>
				<h3><?php echo $subtitle; ?></h3>
				<div class="skills anim-content">
					<div class="bar-holder bp-left fl">
						<h4>HTML5</h4>
						<div class="bar bp-set vm bar-empty"><div class="html-bar bp-ab" data-value="<?php echo $html; ?>"></div></div>
						<label><span class="single"><?php echo $html; ?></span>%</label>
					</div>
					<div class="bar-holder bp-left fr">
						<h4>JAVASCRIPT/JQUERY</h4>
						<div class="bar bp-set vm bar-empty"><div class="html-bar bp-ab" data-value="<?php echo $javascript; ?>"></div></div>
						<label><span class="single"><?php echo $javascript; ?></span>%</label>
					</div>
					<div class="bar-holder bp-left fl">
						<h4>CSS/CSS3</h4>
						<div class="bar bp-set vm bar-empty"><div class="html-bar bp-ab" data-value="<?php echo $css; ?>"></div></div>
						<label><span class="single"><?php echo $css; ?></span>%</label>
					</div>
					<div class="bar-holder bp-left fr">
						<h4>PHOTOSHOP</h4>
						<div class="bar bp-set vm bar-empty"><div class="html-bar bp-ab" data-value="<?php echo $photoshop; ?>"></div></div>
						<label><span class="single"><?php echo $photoshop; ?></span>%</label>
					</div>
					<div class="clr"></div>
				</div>
			</div>
		</div>

		<div id="portfolio" class="layer layer4 bp-rel">
			<div class="auto bp-center anim-content">
				<?php
				   $post = get_page($id=59);
				   $title = apply_filters('the_title', $post->post_title);
				   $subtitle = apply_filters('portfolio_sub_title', $post->portfolio_sub_title);
				?>
				<h2><?php echo $title; ?></h2>
				<h3><?php echo $subtitle; ?></h3>
				<div class="portfolio">
					<ul class="anim-content">
						<?php
							$args = array( 'post_type' => 'portfolio',"order" => "ASC",'post_status'=>'publish','posts_per_page'=>8);// $args = array("post_type" => "post", "category_name" => "portfolio", "order" => "ASC", "post_status" => "publish", "posts_per_page"=>8);
							$the_query = new WP_Query($args);
						?>
						<?php if(have_posts()):while($the_query->have_posts()):$the_query->the_post(); ?><!--query all pages-->
						<li>
							<?php the_post_thumbnail(); ?>
							<p><?php the_title(); ?></p>
						</li>
						<?php	endwhile;
							else:
							echo '<p>No content found.</p>';
							endif;
						?>
					</ul>
				</div>
			</div>
		</div>

		<div id="contactMe" class="layer layer5 bp-rel" data-stellar-background-ratio="0.4">
			<div class="auto bp-center anim-content bp-rel">
				<?php
				   $post = get_page($id=93);
				   $title = apply_filters('the_title', $post->post_title);
					 $content = apply_filters('the_content', $post->post_content);
				   $subtitle = apply_filters('contact_me_sub_title', $post->contact_me_sub_title);
				?>
				<h2><?php echo $title; ?></h2>
				<h3><?php echo $subtitle; ?></h3>
				<div class="contact-form">
					<form class="" action="" method="post">
						<ul class="anim-content">
							<?php echo $content; ?>
						</ul>
					</form>
				</div>
			</div>
		</div>

	</section>
</section>
<?php get_footer(); ?>
