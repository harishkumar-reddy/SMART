<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="landing_page")
     */
    public function index()
    {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }
    /**
     * @Route("/dashboard", name="dashboard_page")
     */
    public function dashboardAction()
    {
        return $this->render('main/dashboard.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }
}
